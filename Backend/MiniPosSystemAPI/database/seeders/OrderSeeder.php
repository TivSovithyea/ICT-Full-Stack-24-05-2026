<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $staff = collect(array_keys(UserSeeder::STAFF))
            ->map(fn (string $email) => User::where('email', $email)->firstOrFail());

        for ($index = 0; $index < 60; $index++) {
            $user = $staff[$index % $staff->count()];
            // Three sales per day during Cambodian shop hours, stored in app timezone.
            $soldAt = CarbonImmutable::create(2026, 9, 1, 9, 0, 0, 'Asia/Phnom_Penh')
                ->addDays(intdiv($index, 3))
                ->addHours(($index % 3) * 4)
                ->addMinutes(($index * 7) % 60)
                ->setTimezone(config('app.timezone'));
            $basket = TwPcStoreCatalog::BASKETS[$index % count(TwPcStoreCatalog::BASKETS)];

            DB::transaction(function () use ($user, $soldAt, $basket): void {
                // Stable fixture identity without changing the application's schema.
                if (Order::where('user_id', $user->id)->where('created_at', $soldAt)->exists()) {
                    return;
                }

                $products = Product::whereIn('name', array_keys($basket))
                    ->orderBy('id')->lockForUpdate()->get()->keyBy('name');
                $lines = [];
                $totalCents = 0;

                foreach ($basket as $name => $quantity) {
                    $product = $products->get($name);

                    if (! $product || $product->stock < $quantity) {
                        throw new RuntimeException("Missing product or insufficient stock for demo sale: {$name}");
                    }

                    // Decimal strings -> integer cents; no floating-point multiplication.
                    [$dollars, $cents] = array_pad(explode('.', (string) $product->price, 2), 2, '0');
                    $priceCents = ((int) $dollars * 100) + (int) str_pad($cents, 2, '0');
                    $subtotalCents = $priceCents * $quantity;
                    $totalCents += $subtotalCents;
                    $lines[] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $this->decimal($priceCents),
                        'subtotal' => $this->decimal($subtotalCents),
                        'created_at' => $soldAt,
                        'updated_at' => $soldAt,
                    ];
                }

                $order = Order::create([
                    'user_id' => $user->id,
                    'total' => $this->decimal($totalCents),
                    'status' => 'completed',
                    'created_at' => $soldAt,
                    'updated_at' => $soldAt,
                ]);

                // Order items are seeded with their parent and stock changes atomically.
                $order->items()->createMany($lines);

                foreach ($basket as $name => $quantity) {
                    $products[$name]->decrement('stock', $quantity);
                }
            });
        }
    }

    private function decimal(int $cents): string
    {
        return sprintf('%d.%02d', intdiv($cents, 100), $cents % 100);
    }
}

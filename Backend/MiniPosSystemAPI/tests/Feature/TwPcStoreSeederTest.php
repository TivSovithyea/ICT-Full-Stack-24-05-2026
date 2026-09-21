<?php

use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Database\Seeders\BrandSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\TwPcStoreCatalog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

uses(RefreshDatabase::class);

test('TW PC STORE seeds consistent Khmer inventory and sales', function () {
    $this->seed(DatabaseSeeder::class);

    $this->assertDatabaseCount('categories', 12);
    $this->assertDatabaseCount('brands', 19);
    $this->assertDatabaseCount('products', 42);
    $this->assertDatabaseCount('users', 3);
    $this->assertDatabaseCount('orders', 60);
    $this->assertDatabaseCount('order_items', 165);

    foreach (Order::with('items.product')->get() as $order) {
        expect(User::find($order->user_id))->not->toBeNull();
        expect($order->status)->toBe('completed');
        expect($order->items->count())->toBeGreaterThanOrEqual(2);
        $totalCents = 0;

        foreach ($order->items as $item) {
            expect($item->product)->not->toBeNull();
            expect($item->product->created_at->lessThanOrEqualTo($order->created_at))->toBeTrue();
            expect($item->quantity)->toBeGreaterThan(0);
            expect($item->created_at->equalTo($order->created_at))->toBeTrue();
            $subtotalCents = (int) round((float) $item->price * 100) * $item->quantity;
            expect((int) round((float) $item->subtotal * 100))->toBe($subtotalCents);
            $totalCents += $subtotalCents;
        }

        expect((int) round((float) $order->total * 100))->toBe($totalCents);
    }

    foreach (TwPcStoreCatalog::PRODUCTS as [$name, $category, $brand, $price, $openingStock]) {
        $product = Product::where('name', $name)->firstOrFail();
        $sold = (int) OrderItem::where('product_id', $product->id)->sum('quantity');
        expect($product->stock)->toBe($openingStock - $sold)->toBeGreaterThanOrEqual(0);
        expect(Category::find($product->category_id)->name)->toBe($category);
        expect(Brand::find($product->brand_id)->name)->toBe($brand);
        expect(preg_match('/[\x{1780}-\x{17FF}]/u', $product->description))->toBe(1);
    }

    expect(Product::where('stock', 0)->exists())->toBeTrue();
    expect(Product::whereBetween('stock', [1, 3])->exists())->toBeTrue();
    expect(Order::orderBy('created_at')->first()->created_at->setTimezone('Asia/Phnom_Penh')->format('Y-m-d H:i'))
        ->toBe('2026-09-01 09:00');
    expect(Order::orderByDesc('created_at')->first()->created_at->setTimezone('Asia/Phnom_Penh')->format('Y-m-d'))
        ->toBe('2026-09-20');
});

test('rerunning TW PC STORE seeds preserves records edits and stock', function () {
    $this->seed(DatabaseSeeder::class);
    $product = Product::where('name', 'Logitech M185 Wireless Mouse')->firstOrFail();
    $product->price = '13.75';
    $product->stock -= 1;
    $product->description = 'តម្លៃកែប្រែសម្រាប់សាកល្បង';
    $product->save();

    $tables = ['categories', 'brands', 'products', 'users', 'orders', 'order_items'];
    $before = collect($tables)->mapWithKeys(fn ($table) => [$table => DB::table($table)->orderBy('id')->get()->toJson()]);

    $this->seed(DatabaseSeeder::class);
    $this->travel(2)->days();
    $this->seed(DatabaseSeeder::class);

    foreach ($tables as $table) {
        expect(DB::table($table)->orderBy('id')->get()->toJson())->toBe($before[$table]);
    }
});

test('insufficient existing stock rolls back the complete seed without deleting existing data', function () {
    $this->seed([
        CategorySeeder::class,
        BrandSeeder::class,
        ProductSeeder::class,
    ]);

    // The second basket fails after the first sale has already been written.
    Product::where('name', 'ASUS Vivobook 15 X1504VA')->update(['stock' => 0]);
    $before = DB::table('products')->orderBy('id')->get()->toJson();

    expect(fn () => $this->seed(DatabaseSeeder::class))->toThrow(RuntimeException::class);

    $this->assertDatabaseCount('orders', 0);
    $this->assertDatabaseCount('order_items', 0);
    $this->assertDatabaseCount('users', 0);
    $this->assertDatabaseCount('products', 42);
    expect(DB::table('products')->orderBy('id')->get()->toJson())->toBe($before);
});

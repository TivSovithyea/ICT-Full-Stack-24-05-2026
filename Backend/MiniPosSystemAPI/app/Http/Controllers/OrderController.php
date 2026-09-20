<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function save(OrderRequest $request)
    {
        return DB::transaction(function () use ($request) {
            // dd(collect($request->items));
            $productIds = collect($request['items'])->pluck('product_id');

            // dd($productIds);

            $products = Product::query()
                ->select('id', 'name', 'stock', 'price')
                ->whereIn('id', $productIds)
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            // dd($products);

            //Validate Stock

            foreach($request->items as $item) {

                foreach($products as $product) {

                    if($product->id == $item['product_id']) {
                        if ($product->stock < $item['quantity']) {
                            throw ValidationException::withMessages([
                                'items' => "Insufficient stock for {$product?->name}",
                            ]);
                        }
                    }

                }

            }

            // 3. calculate lines and total

            $lines = [];
            $total = 0;
            foreach ($request['items'] as $input) {
                $product = $products[$input['product_id']];
                $qty = $input['quantity'];
                $subtotal = $product->price * $qty;
                $total += $subtotal;
                $lines[] = [
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'price' => $product->price,
                    'subtotal' => $subtotal,
                ];
            }

            // 4. create order and order items

            $order = Order::create([
                'user_id' => $request->user()?->id,
                'total' => $total,
                'status' => 'completed',
            ]);

            $order->items()->createMany($lines);

             // 5. reduce stock

            foreach ($request['items'] as $input) {
                $product = $products->get($input['product_id']);
                $product->decrement(
                    'stock',
                    (int) $input['quantity']
                );
            }

            return response()->json(
                $order->load('items.product'),
                201
            );
        }, attempts: 3);

    }
}

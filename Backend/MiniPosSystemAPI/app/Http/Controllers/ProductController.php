<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category');

        if($request->search) {
            $products->where('name', 'LIKE', '%'. $request->search . '%');
                // ->orWhere('description', 'LIKE', '%'. $request->search . '%');
            //where name LIKE '%fan%' OR description LIKE '%fan%'
        }

        if($request->category_id) {
            // dd('x');
            $products->where('category_id', $request->category_id);
        }

        return response()->json([
            'data' => $products->latest()->paginate($request->per_page ?? 2)
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'string|required|max:191',
            'category_id' => 'required|exists:categories,id',
            'description' => 'string|nullable',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0'
        ]);

        // Object Instance

        $product = new Product();
        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;

        if($product->save()) {
            return response()->json([
                'data' => $product,
                'message' => 'Success create product'
            ]);
        } else {
            return response()->json([
                'message' => 'Error create product fail'
            ], 400);
        }
    }

    public function show(Request $request) {
        // dd($request->product);
        $product = Product::findOrFail($request->product);
        return response()->json([
            'data' => $product
        ]);
    }

    public function update(Request $request) {

        $data = $request->validate([
            'name' => 'string|required|max:191',
            'category_id' => 'required|exists:categories,id',
            'description' => 'string|nullable',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0'
        ]);

        $product = Product::findOrFail($request->product);

        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;

        if($product->save()) {
            return response()->json([
                'data' => $product,
                'message' => 'Success update product'
            ]);
        } else {
            return response()->json([
                'message' => 'Error update product fail'
            ], 400);
        }
    }

    public function destroy(Request $request) {
        $product = Product::findOrFail($request->product);

        if($product->delete()) {
            return response()->json([
                'message' => 'Success delete product'
            ]);
        } else {
            return response()->json([
                'message' => 'delete product fail'
            ], 400);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        // $categories = [
        //     [
        //         'id' => 1,
        //         'name' => 'Fruit'
        //     ],
        //     [
        //         'id' => 2,
        //         'name' => 'Drink'
        //     ]
        // ];

        $categories = Category::withCount('products')
            // ->with(['products'  => function ($query) {
            //     $query->select('category_id', 'name');
            // }])
            ->with('products')
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'data' => $categories
        ]);
    }

    public function store(Request $request) {

        // dd($request->all());

        $request->validate([
            'name' => 'required | string | max:191'
        ]);

        $category = Category::create($request->all());

        if($category) {
            return response()->json([
                'data' => $category,
                'message' => 'Successfully create category'
            ]);
        } else {
            return response()->json([
                'message' => "Can't save category."
            ], 400);
        }
    }

    public function show(Request $request) {
        // dd($request->id);
        $category = Category::findOrFail($request->id);

        return response()->json([
            'data' => $category
        ]);
    }

    public function update(Request $request) {
        // find by id & update

        $request->validate([
            'name' => 'required | string | max:191'
        ]);

        $category = Category::findOrFail($request->id);

        $category->name = $request->name;
        $category->description = $request->description;

        $category->save();

        if($category) {
            return response()->json([
                'data' => $category,
                'message' => 'Successfully update category'
            ]);
        } else {
            return response()->json([
                'message' => "Can't update category."
            ], 400);
        }

    }

    public function destroy(Request $request) {
        // find by id & delete

        $category = Category::findOrFail($request->id);
        $category->delete();
        return response()->json([
            'message' => 'Successfully delete category'
        ]);
    }
}

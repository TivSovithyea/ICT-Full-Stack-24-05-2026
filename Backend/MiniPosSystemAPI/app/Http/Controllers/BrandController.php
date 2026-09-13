<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Brand::withCount('products')
            // ->with(['products'  => function ($query) {
            //     $query->select('category_id', 'name');
            // }])
            ->with('products')
            ->latest()
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        // $request->validate([
        //     'name' => 'required | string | max:191'
        // ]);

        $model = Brand::create($request->all());

        if($model) {
            return response()->json([
                'data' => $model,
                'message' => 'Successfully create brand'
            ]);
        } else {
            return response()->json([
                'message' => "Can't save brand."
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return response()->json([
            'data' => $brand
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $brand->name = $request->name;
        $brand->description = $request->description;

        $brand->save();

        if($brand) {
            return response()->json([
                'data' => $brand,
                'message' => 'Successfully update brand'
            ]);
        } else {
            return response()->json([
                'message' => "Can't update brand."
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json([
            'message' => 'Successfully delete category'
        ]);
    }
}

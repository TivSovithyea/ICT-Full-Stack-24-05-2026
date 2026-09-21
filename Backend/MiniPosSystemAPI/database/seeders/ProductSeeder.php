<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        foreach (TwPcStoreCatalog::PRODUCTS as [$name, $category, $brand, $price, $stock, $description]) {
            // Preserve existing prices, stock, images, and edits on subsequent runs.
            Product::firstOrCreate(['name' => $name], [
                'category_id' => Category::where('name', $category)->firstOrFail()->id,
                'brand_id' => Brand::where('name', $brand)->firstOrFail()->id,
                'price' => $price,
                'stock' => $stock,
                'description' => $description,
                'image' => null,
                'created_at' => TwPcStoreCatalog::stockedAt(),
                'updated_at' => TwPcStoreCatalog::stockedAt(),
            ]);
        }
    }
}

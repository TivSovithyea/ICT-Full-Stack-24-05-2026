<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (TwPcStoreCatalog::CATEGORIES as $name => $description) {
            Category::firstOrCreate(['name' => $name], [
                'description' => $description,
                'created_at' => TwPcStoreCatalog::stockedAt(),
                'updated_at' => TwPcStoreCatalog::stockedAt(),
            ]);
        }
    }
}

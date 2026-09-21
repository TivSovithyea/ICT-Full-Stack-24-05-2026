<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (TwPcStoreCatalog::BRANDS as $name => $description) {
            Brand::firstOrCreate(['name' => $name], [
                'description' => $description,
                'created_at' => TwPcStoreCatalog::stockedAt(),
                'updated_at' => TwPcStoreCatalog::stockedAt(),
            ]);
        }
    }
}

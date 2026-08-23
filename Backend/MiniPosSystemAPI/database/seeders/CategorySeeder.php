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
        for ($i = 0; $i < 500; $i++) {
            Category::create([
                'name' => ucfirst(fake()->unique()->words(3, true)),
                'description' => fake()->optional()->sentence(),
            ]);
        }
    }
}

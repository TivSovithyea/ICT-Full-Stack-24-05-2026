<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public const STAFF = [
        'sokha@twpcstore.example' => 'សុខា',
        'dara@twpcstore.example' => 'ដារ៉ា',
        'sophea@twpcstore.example' => 'សុភា',
    ];

    public function run(): void
    {
        foreach (self::STAFF as $email => $name) {
            User::firstOrCreate(['email' => $email], [
                'name' => $name,
                'password' => Hash::make('TWPC-demo-2026!'),
                'email_verified_at' => TwPcStoreCatalog::stockedAt(),
                'created_at' => TwPcStoreCatalog::stockedAt(),
                'updated_at' => TwPcStoreCatalog::stockedAt(),
            ]);
        }
    }
}

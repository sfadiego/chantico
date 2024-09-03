<?php

namespace Database\Seeders;

use App\Models\CategoriesModel;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'CAFÉ',
            'TISANA',
            'SODA ITALIANA',
            'SMOOTIE',
            'WAFFLES',
            'PANINIS',
            'ENSALADAS',
            'POSTRES',
            'OTROS',
            'FRAPPÉ',
            'SÁNDWICH',
            'EXTRAS',
        ];

        foreach ($categories as $category) {
            CategoriesModel::updateOrCreate(['nombre' => $category]);
        }
    }
}

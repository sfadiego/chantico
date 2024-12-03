<?php

namespace Database\Seeders;

use App\Models\CategoryModel;
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
            CategoryModel::updateOrCreate(['nombre' => $category]);
        }
    }
}

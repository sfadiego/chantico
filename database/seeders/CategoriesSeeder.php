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
            'SMOOTHIE',
            'WAFFLES & CREPAS',
            'PANINIS',
            'ENSALADAS',
            'POSTRES',
            'OTROS',
            'FRAPPÉ',
            'SÁNDWICH',
            'EXTRAS',
            'LECHITAS',
            'Naturales',
            'CHOCOLATES',
            '+18',
            'PA PICAR',
            'TEMPORADA',
        ];

        collect($categories)
            ->each(function ($category) {
                CategoryModel::updateOrCreate(
                    ['nombre' => $category, CategoryModel::TENANT_ID => 1]
                );
            });
    }
}

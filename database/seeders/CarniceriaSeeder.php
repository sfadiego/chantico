<?php

namespace Database\Seeders;

use App\Enums\UnidadMedidaEnum;
use App\Models\CategoryModel;
use App\Models\ProductModel;
use Illuminate\Database\Seeder;

class CarniceriaSeeder extends Seeder
{
    private const TENANT_ID = 8;

    public function run(): void
    {
        $catalog = [
            'Res' => [
                ['nombre' => 'Bistec de res',        'precio' => 120.00, 'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Carne molida',          'precio' => 95.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Costilla de res',       'precio' => 85.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Retazo para caldo',     'precio' => 70.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Chambarete',            'precio' => 80.00,  'unidad' => UnidadMedidaEnum::Kg],
            ],
            'Cerdo' => [
                ['nombre' => 'Chuleta de cerdo',      'precio' => 90.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Pierna de cerdo',       'precio' => 85.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Costilla de cerdo',     'precio' => 78.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Tocino rebanado',       'precio' => 110.00, 'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Lomo de cerdo',         'precio' => 95.00,  'unidad' => UnidadMedidaEnum::Kg],
            ],
            'Pollo' => [
                ['nombre' => 'Pollo entero',          'precio' => 45.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Pechuga sin hueso',     'precio' => 80.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Muslo con pierna',      'precio' => 55.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Ala de pollo',          'precio' => 50.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Mollejas de pollo',     'precio' => 40.00,  'unidad' => UnidadMedidaEnum::Kg],
            ],
            'Embutidos' => [
                ['nombre' => 'Chorizo',               'precio' => 95.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Salchicha Frankfurt',   'precio' => 70.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Jamón de pierna',       'precio' => 85.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Longaniza',             'precio' => 88.00,  'unidad' => UnidadMedidaEnum::Kg],
                ['nombre' => 'Mortadela',             'precio' => 60.00,  'unidad' => UnidadMedidaEnum::Kg],
            ],
        ];

        foreach ($catalog as $categoryName => $products) {
            $category = CategoryModel::updateOrCreate(
                [
                    CategoryModel::NOMBRE    => $categoryName,
                    CategoryModel::TENANT_ID => self::TENANT_ID,
                ],
            );

            foreach ($products as $p) {
                ProductModel::updateOrCreate(
                    [
                        ProductModel::NOMBRE    => $p['nombre'],
                        ProductModel::TENANT_ID => self::TENANT_ID,
                    ],
                    [
                        ProductModel::PRECIO        => $p['precio'],
                        ProductModel::DESCRIPCION   => '',
                        ProductModel::CATEGORIA_ID  => $category->id,
                        ProductModel::ACTIVO        => true,
                        ProductModel::UNIDAD_MEDIDA => $p['unidad']->value,
                    ],
                );
            }
        }

        $this->command->info('Carnicería Zepeda: 4 categorías y 20 productos creados.');
    }
}

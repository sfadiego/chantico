<?php

namespace Database\Seeders;

use App\Models\MainOrderReportModel;
use App\Models\OrderModel;
use App\Models\OrderProductModel;
use App\Models\ProductModel;
use App\Models\User;
use Illuminate\Database\Seeder;

class FactorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(3)->create();
        ProductModel::factory()->count(10)->create();
        MainOrderReportModel::factory()->create();
        OrderModel::factory()->count(5)->create();
        OrderProductModel::factory()->count(10)->create();
    }
}

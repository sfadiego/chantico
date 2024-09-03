<?php

namespace Database\Seeders;

use App\Enums\OrderStatusEnum;
use App\Models\OrderStatusModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [OrderStatusModel::NOMBRE => OrderStatusEnum::orderStatusName(OrderStatusEnum::IN_PROCESS)],
            [OrderStatusModel::NOMBRE => OrderStatusEnum::orderStatusName(OrderStatusEnum::CANCELED)],
            [OrderStatusModel::NOMBRE => OrderStatusEnum::orderStatusName(OrderStatusEnum::CLOSED)]
        ];

        OrderStatusModel::insert($data);
    }
}

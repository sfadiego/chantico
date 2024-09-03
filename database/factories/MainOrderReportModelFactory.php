<?php

namespace Database\Factories;

use App\Enums\MainOrderStatusEnum;
use App\Models\MainOrderReportModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MainOrderReportModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = MainOrderReportModel::class;

    public function definition(): array
    {
        return [
            MainOrderReportModel::ESTATUS_CAJA => MainOrderStatusEnum::OPEN,
            MainOrderReportModel::EFECTIVO_CAJA_INICIO => fake()->numberBetween(800, 3000),
            MainOrderReportModel::EFECTIVO_CAJA_CIERRE => fake()->numberBetween(1000, 3000),
            MainOrderReportModel::GANANCIA_DIA => fake()->numberBetween(1000, 3000),
            MainOrderReportModel::CREATED_AT => now()
        ];
    }
}

<?php

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('order_status')->insertOrIgnore([
            [
                'id'     => OrderStatusEnum::READY_TO_SERVE->value,
                'nombre' => OrderStatusEnum::orderStatusName(OrderStatusEnum::READY_TO_SERVE),
            ],
        ]);
    }

    public function down(): void
    {
        DB::table('order_status')->where('id', OrderStatusEnum::READY_TO_SERVE->value)->delete();
    }
};

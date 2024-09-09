<?php

use App\Enums\MainOrderStatusEnum;
use App\Models\MainOrderReportModel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('main_order_report', function (Blueprint $table) {
            $table->id();
            $table->integer(MainOrderReportModel::ESTATUS_CAJA)->default(MainOrderStatusEnum::OPEN);
            $table->double(MainOrderReportModel::EFECTIVO_CAJA_INICIO)->default(0);
            $table->double(MainOrderReportModel::EFECTIVO_CAJA_CIERRE)->default(0);
            $table->double(MainOrderReportModel::VENTA_DIA)->nullable();
            $table->text(MainOrderReportModel::OBSERVACION)->nullable();
            $table->foreignId(MainOrderReportModel::USER_ID)
                ->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('main_order_report');
    }
};

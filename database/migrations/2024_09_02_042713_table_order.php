<?php

use App\Models\OrderModel;
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
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->float(OrderModel::TOTAL)->nullable()->default(0);
            $table->float(OrderModel::SUBTOTAL)->nullable()->default(0);
            $table->integer(OrderModel::DESCUENTO)->nullable()->default(0);
            $table->string(OrderModel::NOMBRE_PEDIDO)->nullable();
            $table->foreignId(OrderModel::ESTATUS_PEDIDO_ID)
                ->constrained('order_status');
            $table->foreignId(OrderModel::SISTEMA_ID)
                ->constrained('main_order_report');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};

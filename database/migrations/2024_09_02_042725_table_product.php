<?php

use App\Models\ProductModel;
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
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string(ProductModel::NOMBRE);
            $table->float(ProductModel::PRECIO);
            $table->text(ProductModel::DESCRIPCION)->nullable();

            $table->foreignId(ProductModel::FOTO_ID)->nullable()
                ->constrained('product_image');
            $table->foreignId(ProductModel::CATEGORIA_ID)
                ->constrained('categories');
            $table->boolean(ProductModel::ACTIVO)->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};

<?php

use App\Models\CategoriesModel;
use App\Models\ProductImageModel;
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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string(CategoriesModel::NOMBRE);
            $table->integer(CategoriesModel::ORDEN)
                ->nullable()
                ->default(1);
            $table->foreignId(CategoriesModel::FOTO_ID)
                ->nullable()
                ->constrained('product_image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};

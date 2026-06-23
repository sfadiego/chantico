<?php

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
        Schema::table('order_product', function (Blueprint $table) {
            $table->string('nombre_extra')->nullable()->after('precio');
            $table->unsignedBigInteger('producto_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('order_product', function (Blueprint $table) {
            $table->dropColumn('nombre_extra');
            $table->unsignedBigInteger('producto_id')->nullable(false)->change();
        });
    }
};

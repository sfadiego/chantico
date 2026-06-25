<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_config', function (Blueprint $table) {
            $table->boolean('activo')->default(true)->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('business_config', function (Blueprint $table) {
            $table->dropColumn('activo');
        });
    }
};

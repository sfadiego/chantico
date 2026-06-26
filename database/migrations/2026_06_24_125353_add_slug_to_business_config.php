<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_config', function (Blueprint $table) {
            $table->string('slug', 100)->nullable()->unique()->after('id');
        });

        // Asignar slug al tenant existente
        DB::table('business_config')->whereNull('slug')->update(['slug' => 'pos-app']);
    }

    public function down(): void
    {
        Schema::table('business_config', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};

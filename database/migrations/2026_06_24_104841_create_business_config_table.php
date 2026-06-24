<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_config', function (Blueprint $table) {
            $table->id();
            $table->string('business_name', 100)->default('Chantico');
            $table->string('primary_color', 7)->default('#f59e0b');
            $table->string('sidebar_color', 7)->default('#1c1917');
            $table->string('logo_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_config');
    }
};

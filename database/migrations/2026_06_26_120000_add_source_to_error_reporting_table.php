<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('error_reporting', function (Blueprint $table) {
            $table->string('source', 20)->default('backend')->after('id');
            $table->string('user_agent')->nullable()->after('response_body');
            $table->string('url')->nullable()->after('user_agent');
        });
    }

    public function down(): void
    {
        Schema::table('error_reporting', function (Blueprint $table) {
            $table->dropColumn(['source', 'user_agent', 'url']);
        });
    }
};

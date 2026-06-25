<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_config', function (Blueprint $table) {
            $table->string('phone', 30)->nullable()->after('logo_path');
            $table->string('address', 200)->nullable()->after('phone');
            $table->string('facebook', 100)->nullable()->after('address');
            $table->string('instagram', 100)->nullable()->after('facebook');
            $table->string('whatsapp', 30)->nullable()->after('instagram');
            $table->string('website', 200)->nullable()->after('whatsapp');
            $table->string('ticket_footer', 100)->nullable()->after('website');
        });
    }

    public function down(): void
    {
        Schema::table('business_config', function (Blueprint $table) {
            $table->dropColumn(['phone', 'address', 'facebook', 'instagram', 'whatsapp', 'website', 'ticket_footer']);
        });
    }
};

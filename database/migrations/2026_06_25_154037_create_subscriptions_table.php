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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('business_config')->cascadeOnDelete();
            $table->string('plan', 20);
            $table->date('starts_at');
            $table->date('expires_at');
            $table->timestamp('paid_at')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('notes', 300)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};

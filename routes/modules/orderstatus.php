<?php

use App\Http\Controllers\OrderStatusController;
use Illuminate\Support\Facades\Route;

Route::prefix('order-status')->group(function () {
    Route::controller(OrderStatusController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('{status}', 'show');
        Route::put('{status}', 'update');
        Route::post('', 'store');
    });
});

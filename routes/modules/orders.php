<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('order')->group(function () {
    Route::controller(OrderController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::prefix('{order}')->group(function () {
            Route::get('', 'show');
            Route::get('total', 'total');
            Route::put('', 'update');
            Route::delete('', 'delete');
            Route::prefix('print')->group(base_path('routes/modules/printer.php'));

            Route::prefix('product')->group(function () {
                Route::controller(OrderProductController::class)->group(function () {
                    Route::get('', 'index');
                    Route::get('{product}', 'show');
                    Route::post('', 'store');
                    Route::put('{product}', 'update');
                    Route::delete('{product}', 'delete');
                });
            });
        });
    });
});

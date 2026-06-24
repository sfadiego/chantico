<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use Illuminate\Support\Facades\Route;

Route::prefix('product')->group(function () {
    Route::controller(ProductController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('{product}', 'show');
        Route::post('', 'store');
        Route::put('{product}', 'update');
        Route::delete('{product}', 'delete');
    });

    Route::prefix('{product}/image')->group(function () {
        Route::controller(ProductImageController::class)->group(function () {
            Route::post('', 'store');
            Route::post('{image}', 'update');
        });
    });
});

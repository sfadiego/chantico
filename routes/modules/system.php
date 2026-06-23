<?php

use App\Http\Controllers\Admin\MainOrderReportController;
use App\Http\Controllers\Admin\StatisticsController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::prefix('users')->group(function () {
        Route::controller(AdminUserController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('{user}', 'show');
        });
    });

    Route::prefix('system')->group(function () {
        Route::controller(MainOrderReportController::class)->group(function () {
            Route::get('', 'index');
            Route::get('active-sale', 'getActiveSale');
            Route::post('open', 'openSales');
            Route::prefix('{system}')->group(function () {
                Route::get('', 'show');
                Route::get('total-current-sales', 'totalCurrentSales');
                Route::post('close', 'closeSales');
            });
        });

        Route::prefix('statistics')->group(function () {
            Route::controller(StatisticsController::class)->group(function () {
                Route::get('best-seller', 'top3BestSeller');
            });
        });
    });
});

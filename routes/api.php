<?php

use App\Http\Controllers\Admin\CategoriesController as AdminCategoriesController;
use App\Http\Controllers\Admin\MainOrderReportController;
use App\Http\Controllers\Admin\OrderStatusController as AdminOrderStatusController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)
        ->group(function () {
            Route::post('register', 'register');
            Route::post('login', 'login');
        });
});

Route::middleware('auth:sanctum')->group(function () {
    //     Route::prefix('producto')->group(function () {});
    //     Route::prefix('producto-pedido')->group(function () {});
    //     Route::prefix('pedido')->group(function () {});
    //     Route::prefix('fotografias')->group(function () {});
    Route::prefix('users')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('{user}', 'show');
        });
    });

    Route::prefix('categories')->group(function () {
        Route::controller(CategoriesController::class)->group(function () {
            Route::get('/', 'index');
        });
    });

    Route::prefix('order-status')->group(function () {
        Route::controller(OrderStatusController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('{status}', 'show');
        });
    });

    Route::prefix('products')->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('{status}', 'show');
        });
    });

    Route::prefix('admin')->group(function () {
        Route::prefix('users')->group(function () {
            Route::controller(AdminUserController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::get('{user}', 'show');
                });
        });

        Route::prefix('system')->group(function () {
            Route::controller(MainOrderReportController::class)
                ->group(function () {
                    Route::get('/', 'index');
                    Route::post('open', 'openSales');
                    Route::post('close/{system}', 'closeSales');
                });
        });

        Route::prefix('categories')->group(function () {
            Route::controller(AdminCategoriesController::class)->group(function () {
                Route::get('/', 'index');
                Route::get('{category}', 'show');
                Route::put('{category}', 'update');
                Route::post('', 'store');
            });
        });

        Route::prefix('products')->group(function () {
            Route::controller(AdminProductController::class)->group(function () {
                Route::get('/', 'index');
                Route::get('{product}', 'show');
                Route::put('{product}', 'update');
                Route::post('', 'store');
            });
        });

        Route::prefix('order-status')->group(function () {
            Route::controller(AdminOrderStatusController::class)->group(function () {
                Route::get('/', 'index');
                Route::get('{status}', 'show');
                Route::put('{status}', 'update');
                Route::post('', 'store');
            });
        });
    });
});

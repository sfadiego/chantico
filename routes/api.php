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
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\StatisticsController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)
        ->group(function () {
            Route::post('register', 'register');
            Route::post('login', 'login');
        });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('users')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('{user}', 'show');
        });
    });

    Route::prefix('category')->group(function () {
        Route::controller(CategoriesController::class)->group(function () {
            Route::get('/', 'index');
            Route::prefix('{category}')->group(function () {
                Route::get('', 'show');
                Route::get('product', 'categoryProduct');
            });
        });
    });

    Route::prefix('order-status')->group(function () {
        Route::controller(OrderStatusController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('{status}', 'show');
        });
    });

    Route::prefix('files')->group(function () {
        Route::controller(FilesController::class)->group(function () {
            Route::get('{file}', 'show');
        });
    });

    Route::prefix('order')->group(function () {
        Route::controller(OrderController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::prefix('{order}')->group(function () {
                Route::get('', 'show');
                Route::get('total', 'total');
                Route::put('', 'update');
                Route::delete('', 'delete');

                Route::prefix('product')->group(function () {
                    Route::controller(OrderProductController::class)
                        ->group(function () {
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

    Route::prefix('product')->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('{product}', 'show');
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
                    Route::get('active-sale', 'getActiveSale');
                    Route::post('open', 'openSales');
                    Route::prefix('{system}')->group(function () {
                        Route::get('', 'show');
                        Route::get('total-close-sales', 'totalCloseSales');
                        Route::get('detail-close-sales', 'detailCloseSales');
                        Route::post('close', 'closeSales');
                    });
                    Route::controller(StatisticsController::class)
                        ->group(function () {
                            Route::prefix('statistics')->group(function () {
                                Route::get('best-seller', 'top3BestSeller');
                            });
                        });
                });
        });

        Route::prefix('category')->group(function () {
            Route::controller(AdminCategoriesController::class)->group(function () {
                Route::get('/', 'index');
                Route::get('{category}', 'show');
                Route::put('{category}', 'update');
                Route::post('', 'store');
                Route::delete('{category}', 'delete');
            });
        });

        Route::prefix('product')->group(function () {
            Route::controller(AdminProductController::class)->group(function () {
                Route::get('/', 'index');
                Route::get('{product}', 'show');
                Route::post('', 'store');
                Route::put('{product}', 'update');
                Route::delete('{product}', 'delete');
            });

            Route::prefix('{product}/image')->group(function () {
                Route::controller(ProductImageController::class)
                    ->group(function () {
                        Route::post('', 'store');
                        Route::post('{image}', 'update');
                    });
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

<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(base_path('routes/modules/auth.php'));

Route::middleware('auth:sanctum')->group(function () {
    require base_path('routes/modules/users.php');
    require base_path('routes/modules/categories.php');
    require base_path('routes/modules/files.php');
    require base_path('routes/modules/orders.php');
    require base_path('routes/modules/products.php');
    require base_path('routes/modules/orderstatus.php');
    require base_path('routes/modules/system.php');
});

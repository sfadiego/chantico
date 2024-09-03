<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->group(function () {
//     Route::prefix('producto')->group(function () {});
//     Route::prefix('producto-pedido')->group(function () {});
//     Route::prefix('pedido')->group(function () {});
//     Route::prefix('sistema')->group(function () {});
//     Route::prefix('fotografias')->group(function () {});
//     Route::prefix('estatus-pedido')->group(function () {});
//     Route::prefix('categorias')->group(function () {});
//     Route::prefix('usuario')->group(function () {});
//     Route::get('usuario', function (Request $request) {
//         // return $request->user();
//     });
// });

Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)
        ->group(function () {
            Route::post('register', 'register');
            Route::post('login', 'login');
        });
});

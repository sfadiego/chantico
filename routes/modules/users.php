<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('{user}', 'show');
    });
});

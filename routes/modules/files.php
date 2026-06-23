<?php

use App\Http\Controllers\FilesController;
use Illuminate\Support\Facades\Route;

Route::prefix('files')->group(function () {
    Route::controller(FilesController::class)->group(function () {
        Route::get('{file}', 'show');
    });
});

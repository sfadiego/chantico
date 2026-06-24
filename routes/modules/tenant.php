<?php

use App\Http\Controllers\TenantController;
use Illuminate\Support\Facades\Route;

// Endpoint público — no requiere autenticación
Route::get('/tenant/{slug}', [TenantController::class, 'show']);

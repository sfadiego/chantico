<?php

use Illuminate\Support\Facades\Route;
// Route::get('assets/{path}', function ($path) {
//     $filePath = resource_path("assets/{$path}");
//     if (!File::exists($filePath)) {
//         abort(404);
//     }

//     return response()->file($filePath);
// })->where('path', '.*');

Route::get('/{any}', function () {
    return view('index');
    // return view('template');
})->where('any', '.*');

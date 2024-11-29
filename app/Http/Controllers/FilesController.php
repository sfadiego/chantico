<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FilesController extends Controller
{
    public function show(string $file): BinaryFileResponse
    {
        if (!Storage::fileExists("/private/$file")) {
            return abort(404);
        }

        $filePath = storage_path("/app/private/$file");
        return response()->file($filePath);
    }
}

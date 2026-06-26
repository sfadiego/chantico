<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FilesController extends Controller
{
    public function show(string $file): BinaryFileResponse
    {
        $relativePath = "/private/$file";

        if (! Storage::fileExists($relativePath)) {
            return abort(404);
        }

        $filePath = storage_path("app$relativePath");

        return response()->file($filePath);
    }
}

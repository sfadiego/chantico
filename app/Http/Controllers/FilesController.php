<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FilesController extends Controller
{
    public function show(string $file): BinaryFileResponse
    {
        $relativePath = "private/$file";

        if (! Storage::disk('local')->exists($relativePath)) {
            abort(404);
        }

        $filePath = Storage::disk('local')->path($relativePath);

        return response()->file($filePath);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessConfigUpdateRequest;
use App\Models\ProductImageModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class BusinessConfigController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return Response::success($request->user()->tenant);
    }

    public function update(BusinessConfigUpdateRequest $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $tenant->update([
            'business_name' => $request->business_name,
            'primary_color' => $request->primary_color,
            'sidebar_color' => $request->sidebar_color,
            'font_color'    => $request->font_color,
            'label_color'   => $request->label_color,
        ]);

        return Response::success($tenant->fresh());
    }

    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate(['logo' => 'required|image|mimes:png,jpg,jpeg,webp|max:2048']);

        $tenant = $request->user()->tenant;
        $upload = ProductImageModel::processImage($request->file('logo'));

        if (! $upload) {
            return Response::error('No se pudo subir el logo');
        }

        $tenant->update(['logo_path' => $upload['nombre_archivo']]);

        return Response::success($tenant->fresh());
    }

    public function removeLogo(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $tenant->update(['logo_path' => null]);

        return Response::success($tenant->fresh());
    }
}

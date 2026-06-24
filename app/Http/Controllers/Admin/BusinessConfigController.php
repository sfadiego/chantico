<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessConfigUpdateRequest;
use App\Models\BusinessConfigModel;
use App\Models\ProductImageModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class BusinessConfigController extends Controller
{
    public function show(): JsonResponse
    {
        return Response::success(BusinessConfigModel::getOrCreate());
    }

    public function update(BusinessConfigUpdateRequest $request): JsonResponse
    {
        $config = BusinessConfigModel::getOrCreate();
        $config->update([
            BusinessConfigModel::BUSINESS_NAME => $request->business_name,
            BusinessConfigModel::PRIMARY_COLOR => $request->primary_color,
            BusinessConfigModel::SIDEBAR_COLOR => $request->sidebar_color,
            BusinessConfigModel::FONT_COLOR    => $request->font_color,
            BusinessConfigModel::LABEL_COLOR   => $request->label_color,
        ]);

        return Response::success($config->fresh());
    }

    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate(['logo' => 'required|image|mimes:png,jpg,jpeg,webp|max:2048']);

        $config = BusinessConfigModel::getOrCreate();
        $upload = ProductImageModel::processImage($request->file('logo'));

        if (! $upload) {
            return Response::error('No se pudo subir el logo');
        }

        $config->update([BusinessConfigModel::LOGO_PATH => $upload['nombre_archivo']]);

        return Response::success($config->fresh());
    }

    public function removeLogo(): JsonResponse
    {
        $config = BusinessConfigModel::getOrCreate();
        $config->update([BusinessConfigModel::LOGO_PATH => null]);

        return Response::success($config->fresh());
    }
}

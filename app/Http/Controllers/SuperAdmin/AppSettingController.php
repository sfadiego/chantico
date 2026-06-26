<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\AppSettingModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class AppSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return Response::success([
            'logo_upload_enabled' => (bool) AppSettingModel::getValue('logo_upload_enabled', '0'),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'logo_upload_enabled' => 'required|boolean',
        ]);

        AppSettingModel::setValue('logo_upload_enabled', $request->boolean('logo_upload_enabled') ? '1' : '0');

        return Response::success([
            'logo_upload_enabled' => $request->boolean('logo_upload_enabled'),
        ]);
    }
}

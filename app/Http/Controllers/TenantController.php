<?php

namespace App\Http\Controllers;

use App\Models\BusinessConfigModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TenantController extends Controller
{
    /** Endpoint público: devuelve la configuración de branding por slug (para la pantalla de login). */
    public function show(string $slug): JsonResponse
    {
        $tenant = BusinessConfigModel::where(BusinessConfigModel::SLUG, $slug)->first();

        if (! $tenant) {
            throw new NotFoundHttpException('Tenant not found.');
        }

        return Response::success($tenant);
    }
}

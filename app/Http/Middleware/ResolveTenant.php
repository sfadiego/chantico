<?php

namespace App\Http\Middleware;

use App\Models\BusinessConfigModel;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ResolveTenant
{
    public function handle(Request $request, Closure $next): SymfonyResponse
    {
        if ($user = $request->user()) {
            $tenant = BusinessConfigModel::find($user->tenant_id);

            if (! $tenant) {
                return Response::json(['message' => 'Tenant no encontrado.'], 403);
            }

            if (! $tenant->activo) {
                return Response::json([
                    'message' => 'La suscripción está desactivada. Contacta al administrador.',
                    'code'    => 'TENANT_INACTIVE',
                ], 403);
            }

            app()->instance('tenant_id', $user->tenant_id);
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\BusinessConfigModel;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $params): JsonResponse
    {
        $user = User::register(
            nombre: $params->nombre,
            email: $params->email,
            usuario: $params->usuario,
            password: bcrypt($params->password),
            apellidoPaterno: $params->apellido_paterno,
            apellidoMaterno: $params->apellido_materno ?? '',
            rolId: $params->rol_id,
        );

        return Response::success(
            [
                'user' => $user->toArray(),
                'token' => $user->createToken('access_token')->plainTextToken,
            ]
        );
    }

    public function login(LoginRequest $params): JsonResponse
    {
        $result = User::login(
            email: $params->email,
            password: $params->password
        );

        if (! $result) {
            return Response::error(__('Credenciales no válidas.'));
        }

        if ($params->filled('slug')) {
            $tenant = BusinessConfigModel::where(BusinessConfigModel::SLUG, $params->slug)->first();

            if (! $tenant || $result['user']->tenant_id !== $tenant->id) {
                $result['user']->tokens()->latest()->first()?->delete();

                return Response::error(__('Credenciales no válidas.'));
            }
        }

        return Response::success($result);
    }
}

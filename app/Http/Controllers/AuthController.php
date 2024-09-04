<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
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
                'token' => $user->createToken('access_token')->plainTextToken
            ]
        );
    }

    public function login(LoginRequest $params): JsonResponse
    {
        $user = User::login(
            email: $params->email,
            password: $params->password
        );
        return $user ? Response::success($user) : Response::error(__("Credenciales no validas."));
    }
}

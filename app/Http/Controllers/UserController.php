<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function show(User $user): JsonResponse
    {
        return Response::success(User::all());
    }
}

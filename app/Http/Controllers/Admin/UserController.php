<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(User::all());
    }

    public function show(User $user): JsonResponse
    {
        return Response::success($user);
    }
}

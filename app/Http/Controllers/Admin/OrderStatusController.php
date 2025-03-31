<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderStatusModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class OrderStatusController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(OrderStatusModel::all());
    }

    public function show(OrderStatusModel $status): JsonResponse
    {
        return Response::success($status);
    }
}

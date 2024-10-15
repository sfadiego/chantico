<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(OrderModel::all());
    }

    public function show(OrderModel $order): JsonResponse
    {
        return Response::success($order->load('orderProducts.product'));
    }

    public function total(OrderModel $order): JsonResponse
    {
        return Response::success($order->totalOrder());
    }
}

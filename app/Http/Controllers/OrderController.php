<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderUpdateRequest;
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

    public function update(OrderModel $order, OrderUpdateRequest $params): JsonResponse
    {
        foreach ($params->toArray() as $param => $value) {
            if (!in_array($param, OrderModel::$ALLOWED_UPDATE)) {
                return Response::error("Parametro no permitido $param");
            }
        }

        $order->update($params->toArray());
        return Response::success($order);
    }

    public function total(OrderModel $order): JsonResponse
    {
        return Response::success($order->totalOrderProducts());
    }
}

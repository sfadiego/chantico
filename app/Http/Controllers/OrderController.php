<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Models\OrderModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(
            OrderModel::with('status')->where('estatus_pedido_id', OrderStatusEnum::IN_PROCESS)->get()
        );
    }

    public function store(OrderStoreRequest $params): JsonResponse
    {
        return Response::success(OrderModel::create($params->toArray()));
    }

    public function show(OrderModel $order): JsonResponse
    {
        return Response::success($order->load('orderProducts.product'));
    }

    public function delete(OrderModel $order): JsonResponse
    {
        if ($order->orderProducts->count()) {
            return Response::error("La orden contiene productos");
        }
        return Response::success($order->delete());
    }

    public function update(OrderModel $order, OrderUpdateRequest $params): JsonResponse
    {
        foreach ($params->toArray() as $param => $value) {
            if (!in_array($param, OrderModel::$ALLOWED_UPDATE)) {
                return Response::error("Parametro no permitido $param");
            }
        }
        #actualiza porcentaje
        $order->update($params->toArray());
        #actualiza total/subtotal
        $orderDetail = $order->totalAndSubTotalOrder();
        $order->update([
            'total' => $orderDetail['total'],
            'subtotal' => $orderDetail['subtotal'],
        ]);


        return Response::success($order);
    }

    public function total(OrderModel $order): JsonResponse
    {
        return Response::success($order->totalOrderProducts());
    }
}

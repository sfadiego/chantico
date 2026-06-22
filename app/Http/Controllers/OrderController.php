<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Models\OrderModel;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class OrderController extends Controller
{
    public function index(IndexData $data, OrderService $service): JsonResponse
    {
        return $service->run($data);
    }

    public function store(OrderStoreRequest $params): JsonResponse
    {
        return Response::success(OrderModel::create($params->toArray()));
    }

    public function show(OrderModel $order): JsonResponse
    {
        $orderDetail = $order->totalAndSubTotalOrder();
        if ($orderDetail['total'] !== $order->total) {
            $order->update([
                'total' => $orderDetail['total'],
                'subtotal' => $orderDetail['subtotal'],
            ]);
        }

        return Response::success($order->load('orderProducts.product'));
    }

    public function delete(OrderModel $order): JsonResponse
    {
        $order->orderProducts()->delete();

        return Response::success($order->delete());
    }

    public function update(OrderModel $order, OrderUpdateRequest $params): JsonResponse
    {
        $orderDetail = $order->totalAndSubTotalOrder();
        $order->update(
            array_merge($params->toArray(), [
                'total' => $orderDetail['total'],
                'subtotal' => $orderDetail['subtotal'],
            ])
        );

        return Response::success($order);
    }

    public function total(OrderModel $order): JsonResponse
    {
        return Response::success($order->totalOrderProducts());
    }
}

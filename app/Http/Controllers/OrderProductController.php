<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderProductStoreRequest;
use App\Http\Requests\OrderProductUpdateRequest;
use App\Models\OrderModel;
use App\Models\OrderProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class OrderProductController extends Controller
{

    public function index(OrderModel $order): JsonResponse
    {
        return Response::success(
            OrderProductModel::where('pedido_id', $order->id)
                ->get()
        );
    }

    public function show(OrderModel $order, string $productId): JsonResponse
    {
        return Response::success(
            OrderProductModel::with('product')->where('pedido_id', $order->id)
                ->where('producto_id', $productId)
                ->get()
        );
    }

    public function update(string $productId, OrderProductUpdateRequest $params): JsonResponse
    {
        $data = OrderProductModel::where('producto_id', $productId)
            ->first()
            ->updateOrderProduct(
                cantidad: $params->cantidad,
                descuento: $params->descuento ?? 0,
            );
        return Response::success($data);
    }

    public function store(string $orderId, OrderProductStoreRequest $params): JsonResponse
    {
        if (!OrderModel::find($orderId)) {
            return  Response::error('no existe la orden');
        }

        $product =  OrderProductModel::where(OrderProductModel::PEDIDO_ID, $orderId)
            ->where(OrderProductModel::PRODUCTO_ID, $params->producto_id)
            ->first();

        $currentItems = $product?->cantidad ?? 0;
        $item = $params?->cantidad;
        $data = OrderProductModel::updateOrCreate(
            [
                OrderProductModel::PRODUCTO_ID => $params->producto_id,
                OrderProductModel::PEDIDO_ID => $orderId,
            ],
            [
                OrderProductModel::PRODUCTO_ID => $params->producto_id,
                OrderProductModel::PEDIDO_ID => $orderId,
                OrderProductModel::CANTIDAD => $currentItems + $item,
                OrderProductModel::PRECIO => $params->precio,
                OrderProductModel::DESCUENTO => $params->descuento ?? 0,
            ]
        );
        return Response::success($data);
    }

    public function delete(int $product): JsonResponse
    {
        $delete = OrderProductModel::where('id', $product)
            ->delete();

        if (!$delete) {
            Log::error('producto no borrado', [$product]);
            return Response::error('producto no borrado');
        }

        return Response::success('elemento borrado de la orden');
    }
}

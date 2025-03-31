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
    /**
     * index
     */
    public function index(OrderModel $order): JsonResponse
    {
        return Response::success(
            OrderProductModel::where('pedido_id', $order->id)
                ->get()
        );
    }

    /**
     * show
     */
    public function show(OrderModel $order, string $productId): JsonResponse
    {
        return Response::success(
            OrderProductModel::with('product')->where('pedido_id', $order->id)
                ->where('producto_id', $productId)
                ->get()
        );
    }

    /**
     * update
     */
    public function update(string $orderId, string $productId, OrderProductUpdateRequest $params): JsonResponse
    {
        $orderProduct = OrderProductModel::where('pedido_id', $orderId)
            ->where('producto_id', $productId);

        if (! $orderProduct->exists()) {
            return Response::error('La orden no contiene este producto');
        }

        $orderProduct = $orderProduct->first();
        $data = [];
        if (isset($params?->cantidad)) {
            $data[OrderProductModel::CANTIDAD] = $params->cantidad;
        }

        if (isset($params?->descuento)) {
            $data[OrderProductModel::DESCUENTO] = $params->descuento;
        }

        $orderProduct->update($data);

        $order = OrderModel::find($orderId);
        $orderDetail = $order->totalAndSubTotalOrder();
        $order->update([
            'total' => $orderDetail['total'],
            'subtotal' => $orderDetail['subtotal'],
        ]);

        return Response::success($orderProduct->refresh());
    }

    /**
     * store
     */
    public function store(string $orderId, OrderProductStoreRequest $params): JsonResponse
    {
        $order = OrderModel::find($orderId);
        if (! $order) {
            return Response::error('no existe la orden');
        }

        $product = OrderProductModel::where(OrderProductModel::PEDIDO_ID, $orderId)
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

        $orderDetail = $order->totalAndSubTotalOrder();
        $order->update([
            'total' => $orderDetail['total'],
            'subtotal' => $orderDetail['subtotal'],
        ]);

        return Response::success($data);
    }

    /**
     * delete
     */
    public function delete(int $orderId, int $product): JsonResponse
    {
        $delete = OrderProductModel::where('pedido_id', $orderId)
            ->where('producto_id', $product)
            ->first();

        if (! $delete) {
            Log::error('producto no encoontrado', [$product]);

            return Response::error('producto no encontrado');
        }

        $delete->delete();
        $order = OrderModel::find($orderId);
        $orderDetails = $order->totalAndSubTotalOrder();

        $order->update([
            'total' => $orderDetails['total'],
            'subtotal' => $orderDetails['subtotal'],
        ]);

        return Response::success('elemento borrado de la orden');
    }
}

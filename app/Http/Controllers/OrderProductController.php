<?php

namespace App\Http\Controllers;

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

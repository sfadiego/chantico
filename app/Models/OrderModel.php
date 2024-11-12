<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    use HasFactory;
    protected $table = 'order';
    const NOMBRE_PEDIDO = "nombre_pedido";
    const TOTAL = "total";
    const SUBTOTAL = "subtotal";
    const DESCUENTO = "descuento";
    const ESTATUS_PEDIDO_ID = "estatus_pedido_id";
    const SISTEMA_ID = "sistema_id";
    const FECHA_INICIO = "fecha_inicio";
    const FECHA_FINAL = "fecha_final";

    protected $fillable = [
        self::TOTAL,
        self::SUBTOTAL,
        self::DESCUENTO,
        self::NOMBRE_PEDIDO,
        self::ESTATUS_PEDIDO_ID,
        self::SISTEMA_ID
    ];

    public function orderProducts()
    {
        return $this->hasMany(OrderProductModel::class, 'pedido_id');
    }

    public function totalAndSubTotalOrder()
    {
        $orderDiscount = $this->descuento ?? 0;
        $orderSubtotal = $this->totalOrderProducts();
        if (!$this->descuento) {
            $orderTotal = $orderSubtotal;
        } else {
            $discount = $orderSubtotal * ($orderDiscount / 100);
            $orderTotal = $orderSubtotal - $discount;
        }

        return [
            'total' => $orderTotal,
            'subtotal' => $orderSubtotal,
        ];
    }

    public function totalOrderProducts()
    {
        return $this->load('orderProducts')
            ->orderProducts
            ->map(function ($item) {
                $precio = $item->precio;
                $cantidad = $item->cantidad;
                $descuentoPerItem = $item->descuento;

                $total = $precio * $cantidad;
                $totalWDescuento = $total - (($total * $descuentoPerItem) / 100);
                return round($totalWDescuento, 2);
            })
            ->sum();
    }

    public static function hasActiveOrders(MainOrderReportModel $system): int
    {
        return $system
            ->whereHas('orders')
            ->with(['orders' => function ($q) {
                $q->whereDate('created_at', now());
                $q->where('estatus_pedido_id', OrderStatusEnum::IN_PROCESS);
            }])
            ->first()->orders->count();
    }
}

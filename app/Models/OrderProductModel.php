<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProductModel extends Model
{
    use HasFactory;
    protected $table = 'order_product';
    const PRODUCTO_ID = "producto_id";
    const PEDIDO_ID = "pedido_id";
    const DESCUENTO = "descuento";
    const CANTIDAD = "cantidad";
    const PRECIO = "precio";
    protected $fillable = [
        self::PRODUCTO_ID,
        self::PEDIDO_ID,
        self::DESCUENTO,
        self::CANTIDAD,
        self::PRECIO
    ];
}

<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function updateOrderProduct(int $cantidad = 1, int $descuento = 0): OrderProductModel
    {
        $data = [];
        $cantidad ? $data[OrderProductModel::CANTIDAD] = $cantidad : null;
        $descuento ? $data[OrderProductModel::DESCUENTO] = $descuento : null;
        $this->update($data);
        return $this->refresh();
    }

    public function product(): HasOne
    {
        return $this->hasOne(ProductModel::class, 'id', self::PRODUCTO_ID);
    }
}

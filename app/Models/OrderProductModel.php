<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class OrderProductModel extends Model
{
    use HasFactory;

    protected $table = 'order_product';

    const PRODUCTO_ID = 'producto_id';

    const PEDIDO_ID = 'pedido_id';

    const DESCUENTO = 'descuento';

    const CANTIDAD = 'cantidad';

    const PRECIO = 'precio';

    const NOMBRE_EXTRA = 'nombre_extra';

    protected $fillable = [
        self::PRODUCTO_ID,
        self::PEDIDO_ID,
        self::DESCUENTO,
        self::CANTIDAD,
        self::PRECIO,
        self::NOMBRE_EXTRA,
    ];

    public function product(): HasOne
    {
        return $this->hasOne(ProductModel::class, 'id', self::PRODUCTO_ID);
    }

    public static function top3BestSeller(?Carbon $start = null, ?Carbon $end = null)
    {
        $query = OrderProductModel::whereHas('product')
            ->with(['product'])
            ->join('order', 'order.id', '=', 'order_product.pedido_id')
            ->where('order.estatus_pedido_id', OrderStatusEnum::CLOSED->value)
            ->select(DB::raw('SUM(order_product.cantidad) as sumatoria'), 'order_product.producto_id')
            ->when($start && $end, fn ($q) => $q->whereBetween('order_product.created_at', [$start, $end]))
            ->groupBy('order_product.producto_id')
            ->orderByDesc('sumatoria')
            ->limit(3)
            ->get();

        return $query->map(function ($item) {
            return [
                'id'      => $item->producto_id,
                'product' => $item->product->nombre,
                'total'   => (int) $item->sumatoria,
            ];
        });
    }
}

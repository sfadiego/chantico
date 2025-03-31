<?php

namespace App\Models;

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

    protected $fillable = [
        self::PRODUCTO_ID,
        self::PEDIDO_ID,
        self::DESCUENTO,
        self::CANTIDAD,
        self::PRECIO,
    ];

    public function product(): HasOne
    {
        return $this->hasOne(ProductModel::class, 'id', self::PRODUCTO_ID);
    }

    public static function top3BestSeller(string $date = '')
    {
        $query = OrderProductModel::whereHas('product')
            ->with(['product'])
            ->select(DB::raw('SUM(cantidad) as sumatoria'), 'producto_id')
            ->when($date !== '', function ($q) use ($date) {
                $q->whereMonth('order_product.created_at', Carbon::parse($date)->month)
                    ->whereYear('order_product.created_at', Carbon::parse($date)->year);
            })
            ->groupBy('producto_id')
            ->orderByDesc('sumatoria')
            ->limit(3)
            ->get();

        return $query->map(function ($item) {
            return [
                'id' => $item->producto_id,
                'product' => $item->product->nombre,
                'total' => $item->sumatoria,
            ];
        });
    }
}

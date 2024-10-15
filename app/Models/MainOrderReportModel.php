<?php

namespace App\Models;

use App\Enums\MainOrderStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainOrderReportModel extends Model
{
    use HasFactory;
    protected $table = 'main_order_report';
    const ESTATUS_CAJA = 'estatus_caja';
    const EFECTIVO_CAJA_INICIO = 'efectivo_caja_inicio';
    const EFECTIVO_CAJA_CIERRE = 'efectivo_caja_cierre';
    const VENTA_DIA = 'venta_dia';
    const OBSERVACION = 'observaciones';
    const USER_ID = 'user_id';

    protected $fillable = [
        self::ESTATUS_CAJA,
        self::EFECTIVO_CAJA_INICIO,
        self::EFECTIVO_CAJA_CIERRE,
        self::VENTA_DIA,
        self::OBSERVACION,
        self::USER_ID,
    ];

    public function orders()
    {
        return $this->hasMany(OrderModel::class, 'sistema_id');
    }

    public static function info(): MainOrderReportModel
    {
        return MainOrderReportModel::whereDate('created_at', now())
            ->first();
    }

    public function totalSalesForDay(): float
    {
        return $this->whereHas('orders.orderProducts')
            ->with(['orders.orderProducts'])
            ->get()
            ->pluck('orders')
            ->flatten()
            ->pluck('orderProducts')
            ->flatten()
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

    public function closeSales(): MainOrderReportModel
    {
        $initialCash = $this->efectivo_caja_inicio;
        $this->update([
            self::VENTA_DIA => $this->totalSalesForDay(),
            self::EFECTIVO_CAJA_CIERRE => $initialCash + $this->totalSalesForDay(),
            self::ESTATUS_CAJA => MainOrderStatusEnum::CLOSE_SALES
        ]);

        return $this->refresh();
    }

    public static function openSales(float $initialCash, int $userId): MainOrderReportModel
    {
        $record = MainOrderReportModel::whereDate('created_at', now())
            ->where('user_id', $userId)
            ->first();
        if ($record) {
            return $record;
        }

        return MainOrderReportModel::create([
            self::ESTATUS_CAJA => MainOrderStatusEnum::OPEN,
            self::EFECTIVO_CAJA_INICIO => $initialCash,
            self::CREATED_AT => now(),
            self::USER_ID => $userId,
        ]);
    }
}

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
    const GANANCIA_DIA = 'ganancia_dia';
    const OBSERVACION = 'observaciones';

    protected $fillable = [
        self::ESTATUS_CAJA,
        self::EFECTIVO_CAJA_INICIO,
        self::EFECTIVO_CAJA_CIERRE,
        self::GANANCIA_DIA,
        self::OBSERVACION
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
        return $this->whereHas('orders.ordersProducts')
            ->with(['orders.ordersProducts'])
            ->get()
            ->pluck('orders')
            ->flatten()
            ->pluck('ordersProducts')
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
            self::GANANCIA_DIA => $this->totalSalesForDay(),
            self::EFECTIVO_CAJA_CIERRE => $initialCash + $this->totalSalesForDay(),
            self::ESTATUS_CAJA => MainOrderStatusEnum::CLOSED
        ]);

        return $this->refresh();
    }

    public static function openSales(float $initialCash): MainOrderReportModel
    {
        $record = MainOrderReportModel::whereDate('created_at', now())
            ->first();
        if ($record) {
            return $record;
        }

        return MainOrderReportModel::create([
            self::ESTATUS_CAJA => MainOrderStatusEnum::OPEN,
            self::EFECTIVO_CAJA_INICIO => $initialCash,
            self::CREATED_AT => now(),
        ]);
    }
}

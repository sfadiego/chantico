<?php

namespace App\Models;

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
}

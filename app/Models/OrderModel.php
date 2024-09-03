<?php

namespace App\Models;

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
}

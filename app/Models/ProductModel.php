<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory;
    protected $table = 'product';
    const NOMBRE = "nombre";
    const PRECIO = "precio";
    const DESCRIPCION = "descripcion";
    const CATEGORIA_ID = "categoria_id";
    const ACTIVO = "activo";
    const FOTO_ID = 'foto_id';
    protected $fillable = [
        self::NOMBRE,
        self::PRECIO,
        self::DESCRIPCION,
        self::CATEGORIA_ID,
        self::ACTIVO,
        self::FOTO_ID
    ];
}

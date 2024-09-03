<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriesModel extends Model
{
    use HasFactory;
    protected $table = 'categories';
    const NOMBRE = "nombre";
    const FOTO_ID = 'foto_id';
    const CATEGORIA_ID = 'categoria_id';
    const ORDEN = 'orden';
    protected $fillable = [
        self::NOMBRE,
        self::FOTO_ID,
        self::CATEGORIA_ID,
        self::ORDEN
    ];
}

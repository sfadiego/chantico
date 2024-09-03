<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImageModel extends Model
{
    use HasFactory;
    protected $table = 'product_image';
    const NOMBRE_ARCHIVO = "nombre_archivo";
    const URL = "url";
    const ARCHIVO = 'archivo';
    const FOTO_ID = "foto_id";

    protected $fillable = [
        self::NOMBRE_ARCHIVO,
        self::URL
    ];
}

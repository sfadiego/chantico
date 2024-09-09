<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoriesModel extends Model
{
    use HasFactory;
    protected $table = 'categories';
    const NOMBRE = "nombre";
    const FOTO_ID = 'foto_id';
    const ORDEN = 'orden';

    protected $fillable = [
        self::NOMBRE,
        self::FOTO_ID,
        self::ORDEN
    ];

    public function products(): HasMany
    {
        return $this->hasMany(ProductModel::class, 'categoria_id', 'id');
    }
}

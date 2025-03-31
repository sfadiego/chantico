<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryModel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'categories';

    const NOMBRE = 'nombre';

    const FOTO_ID = 'foto_id';

    const ORDEN = 'orden';

    protected $fillable = [
        self::NOMBRE,
        self::FOTO_ID,
        self::ORDEN,
    ];

    public function products(): HasMany
    {
        return $this->hasMany(ProductModel::class, 'categoria_id', 'id');
    }

    public static function getCategories(string $categoryName = ''): Collection
    {
        return CategoryModel::when($categoryName !== '', function ($q) use ($categoryName) {
            $q->where(self::NOMBRE, 'like', "%$categoryName%");
        })
            ->get();
    }
}

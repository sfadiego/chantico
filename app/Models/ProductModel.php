<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public static function store(
        string $nombre,
        float $precio,
        string $descripcion,
        int $categoriaId,
        string $pictureId = null,
    ): ProductModel {

        return ProductModel::create([
            ProductModel::NOMBRE => $nombre,
            ProductModel::PRECIO => $precio,
            ProductModel::DESCRIPCION => $descripcion,
            ProductModel::CATEGORIA_ID => $categoriaId,
            ProductModel::ACTIVO => 1,
            ProductModel::FOTO_ID => $pictureId
        ]);
    }

    public static function getProducts(string $param = null): Collection
    {
        $data = ProductModel::with('picture');
        if ($param) {
            $data = $data->where(self::NOMBRE, 'like', "%$param%");
        }

        return $data->get();
    }

    public function updateProduct(
        ?string $nombre,
        ?float $precio,
        ?string $descripcion,
        ?int $categoriaId,
        ?int $pictureId,
        ?bool $active,
    ): ProductModel {

        $data = [];
        $nombre ? $data[ProductModel::NOMBRE] = $nombre : null;
        $precio ? $data[ProductModel::PRECIO] = $precio : null;
        $descripcion ? $data[ProductModel::DESCRIPCION] = $descripcion : null;
        $categoriaId ? $data[ProductModel::CATEGORIA_ID] = $categoriaId : null;
        $active ? $data[ProductModel::ACTIVO] = $active : null;
        $pictureId ? $data[ProductModel::FOTO_ID] = $pictureId : null;

        $this->update($data);
        return $this->refresh();
    }

    public function picture(): HasOne
    {
        return $this->hasOne(ProductImageModel::class, 'id', 'foto_id');
    }
}

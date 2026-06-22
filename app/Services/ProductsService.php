<?php

namespace App\Services;

use App\Core\Data\IndexData;
use App\Core\Paginator\DataTable;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;

class ProductsService extends DataTable
{
    public function __construct(ProductModel $model)
    {
        parent::__construct($model);
    }

    public function tableHeaders(): array
    {
        return [
            'id' => '#',
            'nombre' => 'Nombre',
            'precio' => 'Precio',
            'descripcion' => 'Descripcion',
            // 'categoria_id' => 'Categoria',
            'activo' => 'Activo',
            // 'foto_id' => 'Foto',
            'actions' => '#',
        ];
    }

    public function customQueryFilters(): array
    {
        return [
            'nombre' => '',
            'categoria_id' => '',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::build($data);
    }
}

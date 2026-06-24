<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\ProductModel;
use App\Services\ProductsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    public function index(IndexData $data, ProductsService $service): JsonResponse
    {
        return $service->run($data);
    }

    public function show(ProductModel $product): JsonResponse
    {
        return Response::success($product->load('picture'));
    }

    public function store(ProductStoreRequest $param): JsonResponse
    {
        return Response::success(
            ProductModel::create([
                ProductModel::NOMBRE => $param->nombre,
                ProductModel::PRECIO => $param->precio,
                ProductModel::DESCRIPCION => $param->descripcion ?? '',
                ProductModel::CATEGORIA_ID => $param->categoria_id,
                ProductModel::FOTO_ID => $param?->picture_id ?? null,
            ])
        );
    }

    public function update(ProductModel $product, ProductUpdateRequest $param): JsonResponse
    {
        return Response::success(
            $product->updateProduct(
                nombre: $param->has('nombre') ? $param->nombre : null,
                precio: $param->has('precio') ? $param->precio : null,
                descripcion: $param->has('descripcion') ? $param->descripcion : null,
                categoriaId: $param->has('categoria_id') ? $param->categoria_id : null,
                pictureId: $param->has('picture_id') ? $param->picture_id : null,
                active: $param->has('active') ? $param->active : true
            )
        );
    }

    public function delete(ProductModel $product): JsonResponse
    {
        if (! $product->count()) {
            return Response::error('Producto invalido');
        }

        return Response::success($product->delete());
    }
}

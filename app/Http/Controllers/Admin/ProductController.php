<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(ProductModel::with('picture')->get());
    }

    public function show(ProductModel $product): JsonResponse
    {
        return Response::success($product->load('picture'));
    }

    public function store(ProductStoreRequest $param): JsonResponse
    {
        return Response::success(
            ProductModel::store(
                nombre: $param->nombre,
                precio: $param->precio,
                descripcion: $param->descripcion ?? '',
                categoriaId: $param->categoria_id,
                pictureId: $param->picture_id
            )
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
}

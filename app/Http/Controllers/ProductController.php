<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    public function index(Request $param): JsonResponse
    {
        $productName = $param?->search ?? '';
        $categoryId = $param?->categoryId ?? 0;
        return Response::success(
            ProductModel::getProducts($productName, $categoryId)
        );
    }

    public function show(ProductModel $product): JsonResponse
    {
        return Response::success($product->load('picture'));
    }

    public function store(ProductStoreRequest $params): JsonResponse
    {
        return Response::success(ProductModel::create($params->toArray()));
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
        if (!$product->count()) {
            return Response::error("Producto invalido");
        }
        return Response::success($product->delete());
    }
}

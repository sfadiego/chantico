<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\CategoryModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CategoriesController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(CategoryModel::all());
    }

    public function show(CategoryModel $category): JsonResponse
    {
        return Response::success($category);
    }

    public function store(CategoryStoreRequest $param): JsonResponse
    {
        return Response::success(
            CategoryModel::store(
                nombre: $param->nombre,
                foto_id: $param->foto_id,
                orden: $param->orden ?? 1,
            )
        );
    }

    // public function update(CategoryUpdateRequest $category): JsonResponse
    // {
    //     return Response::success($category);
    // }
    public function update(CategoryModel $category, CategoryUpdateRequest $param): JsonResponse
    {
        return Response::success(
            $category->updateProduct(
                nombre: $param->has('nombre') ? $param->nombre : null,
                foto_id: $param->has('precio') ? $param->precio : null,
                orden: $param->has('descripcion') ? $param->descripcion : null,
            )
        );
    }
}

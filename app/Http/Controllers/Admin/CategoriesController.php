<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\CategoryModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class CategoriesController extends Controller
{
    public function store(CategoryStoreRequest $param): JsonResponse
    {
        return Response::success(
            CategoryModel::create([
                'nombre' => $param->nombre,
                'orden' => $param->orden ?? 1,
            ])
        );
    }

    public function update(CategoryModel $category, CategoryUpdateRequest $param): JsonResponse
    {
        return Response::success(
            $category->update([
                'nombre' => $param->has('nombre') ? $param->nombre : null,
                'foto_id' => $param->has('foto_id') ? $param->foto_id : null,
                'orden' => $param->has('orden') ? $param->orden : null,
            ])
        );
    }

    public function delete(CategoryModel $category): JsonResponse
    {
        if (! $category->count()) {
            return Response::error('Categoria no valida');
        }

        return Response::success($category->delete());
    }
}

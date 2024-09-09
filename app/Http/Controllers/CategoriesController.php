<?php

namespace App\Http\Controllers;

use App\Models\CategoriesModel;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CategoriesController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(CategoriesModel::all());
    }

    public function show(CategoriesModel $category): JsonResponse
    {
        return Response::success($category);
    }

    public function categoryProduct(CategoriesModel $category): JsonResponse
    {
        return Response::success(ProductModel::where(ProductModel::CATEGORIA_ID, $category->id)->get());
    }
}

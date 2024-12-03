<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use App\Models\ProductModel;
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

    public function categoryProduct(CategoryModel $category): JsonResponse
    {
        return Response::success(ProductModel::where(ProductModel::CATEGORIA_ID, $category->id)->get());
    }
}

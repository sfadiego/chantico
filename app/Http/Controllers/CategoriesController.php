<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CategoriesController extends Controller
{
    public function index(Request $param): JsonResponse
    {
        $searchStatement = $param?->search ?? '';

        return Response::success(CategoryModel::getCategories($searchStatement));
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

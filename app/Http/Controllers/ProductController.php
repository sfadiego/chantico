<?php

namespace App\Http\Controllers;

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
}

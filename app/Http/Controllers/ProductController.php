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
        return Response::success(
            ProductModel::getProducts($param->search)
        );
    }

    public function show(ProductModel $product): JsonResponse
    {
        return Response::success($product->load('picture'));
    }
}

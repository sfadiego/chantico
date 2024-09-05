<?php

namespace App\Http\Controllers;

use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(ProductModel::with('pictures')->get());
    }

    public function show(ProductModel $product): JsonResponse
    {
        return Response::success($product->load('pictures'));
    }
}

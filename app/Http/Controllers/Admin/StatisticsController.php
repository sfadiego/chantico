<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderProductModel;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class StatisticsController extends Controller
{

    public function top3BestSeller(Request $request): JsonResponse
    {
        $date = Carbon::parse($request?->date ?? Date('Y-m'))->format('Y-m');
        return Response::success(OrderProductModel::top3BestSeller($date));
    }
}

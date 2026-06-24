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
        $tz   = config('app.timezone');
        $raw  = $request->input('date') ?? Carbon::now($tz)->toDateString();
        $date = Carbon::parse($raw, $tz);

        $start = $date->copy()->startOfMonth()->utc();
        $end   = $date->copy()->endOfMonth()->utc();

        return Response::success(OrderProductModel::top3BestSeller($start, $end));
    }
}

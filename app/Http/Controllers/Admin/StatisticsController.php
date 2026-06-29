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
        $start = null;
        $end = null;

        if ($raw = $request->input('date')) {
            $tz = config('app.timezone');
            $date = Carbon::parse($raw, $tz);
            $start = $date->copy()->startOfMonth()->utc();
            $end   = $date->copy()->endOfMonth()->utc();
        }

        $sistemaId = $request->integer('sistema_id') ?: null;

        return Response::success(OrderProductModel::top3BestSeller($start, $end, $sistemaId));
    }
}

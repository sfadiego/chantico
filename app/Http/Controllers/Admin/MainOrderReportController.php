<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MainOrderStatusEnum;
use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\OpenSalesRequest;
use App\Models\MainOrderReportModel;
use App\Models\OrderModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class MainOrderReportController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(
            MainOrderReportModel::info()
        );
    }

    public function openSales(OpenSalesRequest $params): JsonResponse
    {
        return Response::success(MainOrderReportModel::openSales($params->efectivo_caja_inicio));
    }

    public function closeSales(MainOrderReportModel $system): JsonResponse
    {
        if ($system->estatus_caja == MainOrderStatusEnum::CLOSED->value) {
            return Response::error("sistema cerrado previamente.");
        }

        if (OrderModel::hasActiveOrders($system)) {
            return Response::error("Debes de finalizar todos las mesas para cerrar sistema.");
        }


        $test = $system->closeSales();

        return Response::success($test);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MainOrderStatusEnum;
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
        return Response::success(MainOrderReportModel::openSales($params->efectivo_caja_inicio, $params->user_id));
    }

    public function totalCloseSales(MainOrderReportModel $system): JsonResponse
    {
        return Response::success($system->totalSalesForDay());
    }

    public function detailCloseSales(MainOrderReportModel $system): JsonResponse
    {
        return Response::success($system->load('orders'));
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

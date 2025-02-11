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
            MainOrderReportModel::all()
                ->sortByDesc('id')
                ->values()
        );
    }

    public function show(MainOrderReportModel $system): JsonResponse
    {
        return Response::success(
            $system->updateCurrentSales()
                ->get()
                ->map(function ($item) {
                    return [
                        "id" => $item["id"],
                        "estatus_caja" => $item["estatus_caja"] ? "Abierta" : "Cerrada",
                        "efectivo_caja_inicio" => $item["efectivo_caja_inicio"],
                        "efectivo_caja_cierre" => $item["efectivo_caja_cierre"],
                        "venta_dia" => $item["venta_dia"],
                        "observaciones" => $item["observaciones"],
                        "created_at" => date($item["created_at"]),
                    ];
                })
        );
    }

    public function getActiveSale(): JsonResponse
    {
        return Response::success(
            (new MainOrderReportModel)->getActiveSale()
        );
    }

    public function openSales(OpenSalesRequest $params): JsonResponse
    {
        if (MainOrderReportModel::validateIfOpenSaleActive()) {
            return Response::error("Existe una session de ventas activa");
        }

        return Response::success(
            MainOrderReportModel::openSales(
                $params->efectivo_caja_inicio,
                $params->user_id,
                $params->observaciones ?: '',
            )
        );
    }

    public function totalCloseSales(MainOrderReportModel $system): JsonResponse
    {
        return Response::success($system->totalSalesByDay());
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

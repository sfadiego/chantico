<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use App\Printer\Data\VentaTicketData;
use App\Printer\Factory\PrinterServiceFactory;
use App\Printer\Formatters\VentaFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class PrintController extends Controller
{
    public function print(OrderModel $order, Request $request)
    {
        try {
            $tenant = $request->user()->tenant;
            $service = PrinterServiceFactory::make(new VentaFormatter, $tenant);
            $service->printTicket(new VentaTicketData($order));

            return Response::success($order, 'Impresión enviada');
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }
}

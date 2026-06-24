<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use App\Printer\Data\VentaTicketData;
use App\Printer\Factory\PrinterServiceFactory;
use App\Printer\Formatters\VentaFormatter;
use Illuminate\Support\Facades\Response;

class PrintController extends Controller
{
    public function print(OrderModel $order)
    {
        try {
            $service = PrinterServiceFactory::make(new VentaFormatter);
            $service->printTicket(new VentaTicketData($order));

            return Response::success($order, 'Impresión enviada');
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }
}

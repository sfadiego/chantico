<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use App\Utils\Utils;
use Illuminate\Support\Facades\Response;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class PrintController extends Controller
{
    public function print(OrderModel $order)
    {
        try {
            $order = $order->load('orderProducts.product');
            $orderId = $order->id;
            $total = $order->total;
            $subtotal = $order->subtotal;
            $descuento = $order->descuento;
            $nombrePedido = $order->nombre_pedido;
            $date = $order->created_at;
            $dateString = Utils::getDateAsString($date);
            $orderProducts = $order->orderProducts;
            if (! $order->orderProducts->count()) {
                return Response::error('No hay productos en el pedido');
            }

            $printerName = env('PRINTER_NAME');
            $connector = new WindowsPrintConnector($printerName);
            $printer = new Printer($connector);
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->setTextSize(1, 1);
            $printer->setEmphasis(true);

            // $imagePath = realpath(__DIR__.'/../../../resources/assets/bebida.png');
            // if (file_exists($imagePath)) {
            //     $img = EscposImage::load($imagePath);
            //     $printer->bitImage($img);
            // }

            $printer->text("CHANTICO Café\n");
            $printer->setEmphasis(false);
            $printer->text($dateString.' '.date('H:i'));
            $printer->feed(2);

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->setEmphasis(true);
            $printer->text('Mesa: '.$nombrePedido."\n");
            $printer->setEmphasis(false);
            $printer->text('Folio: CHAN-0'.$orderId." \n");
            $printer->feed(1);
            $printer->setEmphasis(true);
            $printer->text("# Producto                Total\n");
            $printer->setEmphasis(false);
            foreach ($orderProducts as $key => $item) {
                $orderProductTotal = $item->precio * $item->cantidad;
                $newTotal = $orderProductTotal - (($orderProductTotal * $item->descuento) / 100);
                $printer->setJustification(Printer::JUSTIFY_LEFT);
                $printer->text($item->cantidad.' '.substr($item->product->nombre, 0, 15).' ($'.$item->precio.') _______ $'.$newTotal." \n");
            }

            $printer->setJustification(Printer::JUSTIFY_RIGHT);
            $printer->feed(2);
            $printer->text('Descuento: '.$descuento."% \n");
            $printer->text('Subtotal: $'.$subtotal."\n");
            $printer->setEmphasis(true);
            $printer->text('Total: $'.$total."\n");
            $printer->text("\n");
            $propinaSugerida = (10 / 100) * $total;
            $printer->text('Propina sugerida: (10%) $'.$propinaSugerida."\n");
            $printer->setEmphasis(false);
            $printer->feed(1);
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->setEmphasis(true);
            $printer->text("''Gracias por su visita'' \n");
            $printer->setEmphasis(false);
            $telefono = '(312) 303-35-58';
            $printer->text('Telefono: '.$telefono." \n");
            $printer->text("fb & ig: @chantico.cafe \n");
            $printer->feed(4);
            $printer->cut();
            $printer->pulse();
            $printer->close();
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }
}

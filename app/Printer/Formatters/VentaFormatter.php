<?php

namespace App\Printer\Formatters;

use App\Printer\Dto\TicketDataInterface;
use App\Printer\Interface\TicketFormatterInterface;
use App\Utils\Utils;
use Mike42\Escpos\Printer;

class VentaFormatter implements TicketFormatterInterface
{
    public function format(TicketDataInterface $data, Printer $connector): void
    {
        // $payload = $data->toArray();
        // $connector->setJustification(Printer::JUSTIFY_CENTER);
        // $connector->text(env('APP_FULL_NAME', ''));
        // $connector->feed(2);

        // $venta_total = $payload['venta_total'];
        // $venta_nombre = $payload['nombre_venta'];
        // $venta_folio = $payload['folio'];
        // $venta_tipo_compra = $payload['tipo_compra'];
        // $venta_created_at = $payload['created_at'];
        // $venta_items = $payload['ventaProductos'];

        // $connector->setJustification(Printer::JUSTIFY_LEFT);
        // $connector->text('Vendido a:');
        // $connector->text($venta_nombre !== '' ? $venta_nombre : ' sin nombre ');
        // $connector->feed(1);
        // $connector->text('Folio: '.$venta_folio);
        // $connector->feed(1);
        // $connector->text('Tipo de compra: '.$venta_tipo_compra);
        // $connector->feed(1);
        // $connector->text('Fecha: '.$venta_created_at);
        // $connector->feed(2);

        // $connector->text('Precio | Cantidad | Producto | Codigo');
        // $connector->feed(1);
        // collect($venta_items)
        //     ->each(function ($item) use ($connector) {
        //         $connector->text('$'.$item['precio'].' x '.$item['cantidad'].'pzas - '.$item['producto_nombre']);
        //         $connector->text(' - '.$item['codigo']."\n");
        //         $connector->feed(1);
        //     });

        // $connector->text('Total: $'.$venta_total);
        // $connector->feed(2);
        // $connector->setJustification(Printer::JUSTIFY_CENTER);
        // $connector->text('Gracias por su compra');
        // $connector->feed(3);

        $order = $data->toArray();
        dd($order);
        // $order = $payload['order'];
        //TODO: modificar logica 
        // $order = $order->load('orderProducts.product');
        // $orderId = $order->id;
        // $total = $order->total;
        // $subtotal = $order->subtotal;
        // $descuento = $order->descuento;
        // $nombrePedido = $order->nombre_pedido;
        // $date = $order->created_at;
        // $dateString = Utils::getDateAsString($date);
        // $orderProducts = $order->orderProducts;
        // // if (! $order->orderProducts->count()) {
        // //     return null; //Response::error('No hay productos en el pedido');
        // // }

        // // $printerName = env('PRINTER_NAME');
        // // $connector = new WindowsPrintConnector($printerName);
        // // $printer = new Printer($connector);
        // $connector->setJustification(Printer::JUSTIFY_CENTER);
        // $connector->setTextSize(1, 1);
        // $connector->setEmphasis(true);


        // $connector->text("CHANTICO Café\n");
        // $connector->setEmphasis(false);
        // $connector->text($dateString . ' ' . date('H:i'));
        // $connector->feed(2);

        // $connector->setJustification(Printer::JUSTIFY_LEFT);
        // $connector->setEmphasis(true);
        // $connector->text('Mesa: ' . $nombrePedido . "\n");
        // $connector->setEmphasis(false);
        // $connector->text('Folio: CHAN-0' . $orderId . " \n");
        // $connector->feed(1);
        // $connector->setEmphasis(true);
        // $connector->text("# Producto                Total\n");
        // $connector->setEmphasis(false);
        // foreach ($orderProducts as $key => $item) {
        //     $orderProductTotal = $item->precio * $item->cantidad;
        //     $newTotal = $orderProductTotal - (($orderProductTotal * $item->descuento) / 100);
        //     $connector->setJustification(Printer::JUSTIFY_LEFT);
        //     $connector->text($item->cantidad . ' ' . substr($item->product->nombre, 0, 15) . ' ($' . $item->precio . ') _______ $' . $newTotal . " \n");
        // }

        // $connector->setJustification(Printer::JUSTIFY_RIGHT);
        // $connector->feed(2);
        // $connector->text('Descuento: ' . $descuento . "% \n");
        // $connector->text('Subtotal: $' . $subtotal . "\n");
        // $connector->setEmphasis(true);
        // $connector->text('Total: $' . $total . "\n");
        // $connector->text("\n");
        // $propinaSugerida = (10 / 100) * $total;
        // $connector->text('Propina sugerida: (10%) $' . $propinaSugerida . "\n");
        // $connector->setEmphasis(false);
        // $connector->feed(1);
        // $connector->setJustification(Printer::JUSTIFY_CENTER);
        // $connector->setEmphasis(true);
        // $connector->text("''Gracias por su visita'' \n");
        // $connector->setEmphasis(false);
        // $telefono = '(312) 303-35-58';
        // $connector->text('Telefono: ' . $telefono . " \n");
        // $connector->text("fb & ig: @chantico.cafe \n");
        // $connector->feed(4);
        // $connector->cut();
        // $connector->pulse();
    }
}

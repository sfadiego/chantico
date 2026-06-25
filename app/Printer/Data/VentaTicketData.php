<?php

namespace App\Printer\Data;

use App\Models\BusinessConfigModel;
use App\Models\OrderModel;
use App\Printer\Dto\TicketDataInterface;
use App\Utils\Utils;

class VentaTicketData implements TicketDataInterface
{
    private OrderModel $venta;

    public function __construct(OrderModel $venta)
    {
        $this->venta = $venta;
    }

    public function getType(): string
    {
        return 'venta';
    }

    public function toArray(): array
    {
        $order = $this->venta->load('orderProducts.product');
        $config = BusinessConfigModel::find($order->tenant_id);

        $products = $order->orderProducts->map(function ($item) {
            $lineTotal = $item->precio * $item->cantidad;
            $discount = $lineTotal * ($item->descuento / 100);

            return [
                'nombre'      => $item->nombre_extra ?? $item->product?->nombre ?? '—',
                'cantidad'    => (int) $item->cantidad,
                'precio'      => (float) $item->precio,
                'descuento'   => (float) $item->descuento,
                'total'       => round($lineTotal - $discount, 2),
                'es_extra'    => ! is_null($item->nombre_extra),
                'observacion' => $item->observacion, // solo para cocina, no se imprime
            ];
        })->toArray();

        return [
            'id'           => $order->id,
            'nombre_pedido' => $order->nombre_pedido,
            'subtotal'     => (float) $order->subtotal,
            'descuento'    => (float) $order->descuento,
            'total'        => (float) $order->total,
            'created_at'   => $order->created_at,
            'fecha_string' => Utils::getDateAsString((string) $order->created_at),
            'hora'         => date('H:i', strtotime((string) $order->created_at)),
            'products'     => $products,
            'business'     => [
                'name'          => $config?->business_name ?? env('APP_FULL_NAME', 'Punto de venta'),
                'phone'         => $config?->phone,
                'address'       => $config?->address,
                'facebook'      => $config?->facebook,
                'instagram'     => $config?->instagram,
                'whatsapp'      => $config?->whatsapp,
                'website'       => $config?->website,
                'ticket_footer' => $config?->ticket_footer,
            ],
        ];
    }
}

<?php

namespace App\Printer\Formatters;

use App\Printer\Dto\TicketDataInterface;
use App\Printer\Interface\TicketFormatterInterface;
use Mike42\Escpos\Printer;

class VentaFormatter implements TicketFormatterInterface
{
    // Ancho estándar impresora 80mm = 48 caracteres
    private const WIDTH = 48;

    public function format(TicketDataInterface $data, Printer $printer): void
    {
        $d = $data->toArray();

        // ─── Encabezado ───────────────────────────────────────
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->setEmphasis(true);
        $printer->setTextSize(2, 2);
        $printer->text(env('APP_FULL_NAME', 'CHANTICO Café') . "\n");
        $printer->setTextSize(1, 1);
        $printer->setEmphasis(false);
        $printer->feed(1);
        $printer->text($d['fecha_string'] . '  ' . $d['hora'] . "\n");
        $printer->feed(1);
        $printer->text($this->line('=') . "\n");

        // ─── Info del pedido ──────────────────────────────────
        $printer->setJustification(Printer::JUSTIFY_LEFT);
        $printer->setEmphasis(true);
        $printer->text('Mesa : ' . $d['nombre_pedido'] . "\n");
        $printer->setEmphasis(false);
        $printer->text('Folio: CHAN-' . str_pad($d['id'], 4, '0', STR_PAD_LEFT) . "\n");
        $printer->feed(1);

        // ─── Encabezado de productos ──────────────────────────
        $printer->text($this->line('-') . "\n");
        $printer->setEmphasis(true);
        $printer->text($this->productHeader() . "\n");
        $printer->setEmphasis(false);
        $printer->text($this->line('-') . "\n");

        // ─── Productos ────────────────────────────────────────
        foreach ($d['products'] as $item) {
            $printer->text($this->productLine($item) . "\n");
        }

        // ─── Totales ──────────────────────────────────────────
        $printer->text($this->line('=') . "\n");
        $printer->setJustification(Printer::JUSTIFY_RIGHT);

        $printer->text($this->totalRow('Subtotal:', '$' . number_format($d['subtotal'], 2)) . "\n");

        if ($d['descuento'] > 0) {
            $printer->text($this->totalRow('Descuento (' . $d['descuento'] . '%):', '-$' . number_format($d['subtotal'] * $d['descuento'] / 100, 2)) . "\n");
        }

        $printer->setEmphasis(true);
        $printer->text($this->totalRow('TOTAL:', '$' . number_format($d['total'], 2)) . "\n");
        $printer->setEmphasis(false);

        $propina = round($d['total'] * 0.10, 2);
        $printer->feed(1);
        $printer->text($this->totalRow('Propina sugerida 10%:', '$' . number_format($propina, 2)) . "\n");

        // ─── Pie del ticket ───────────────────────────────────
        $printer->feed(1);
        $printer->text($this->line('=') . "\n");
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->setEmphasis(true);
        $printer->text("¡Gracias por su visita!\n");
        $printer->setEmphasis(false);
        $printer->feed(1);
        $printer->text('Tel: ' . env('APP_PHONE', '(312) 303-35-58') . "\n");
        $printer->text(env("SOCIAL_MEDIA", 'fb & ig: @chantico.cafe') . "\n");
        $printer->text($this->line('=') . "\n");
        $printer->feed(4);
    }

    // ─── Helpers ──────────────────────────────────────────────

    private function line(string $char): string
    {
        return str_repeat($char, self::WIDTH);
    }

    /** Encabezado: "CANT  PRODUCTO              PRECIO   TOTAL" */
    private function productHeader(): string
    {
        return str_pad('CANT', 5)
            . str_pad('PRODUCTO', 22)
            . str_pad('P.U.', 9, ' ', STR_PAD_LEFT)
            . str_pad('TOTAL', 12, ' ', STR_PAD_LEFT);
    }

    /** Línea de producto: "  2   Café Americano      $ 35.00  $ 70.00" */
    private function productLine(array $item): string
    {
        $qty    = str_pad((string) $item['cantidad'], 5);
        $name   = str_pad(mb_substr($item['nombre'], 0, 21), 22);
        $precio = str_pad('$' . number_format($item['precio'], 2), 9, ' ', STR_PAD_LEFT);
        $total  = str_pad('$' . number_format($item['total'], 2), 12, ' ', STR_PAD_LEFT);

        $line = $qty . $name . $precio . $total;

        // Si es extra, añade indicador en segunda línea
        if ($item['es_extra']) {
            $line .= "\n" . str_repeat(' ', 5) . '[Extra]';
        }

        return $line;
    }

    /** Fila de total alineada a la derecha dentro del ancho */
    private function totalRow(string $label, string $value): string
    {
        $available = self::WIDTH;
        $valueLen  = strlen($value);
        $labelLen  = $available - $valueLen;

        return str_pad($label, $labelLen) . $value;
    }
}

<?php

namespace App\Printer\Connectors;

use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class WindowsConnector extends AbstractConnector
{
    public function init(): void
    {
        $this->connector = new WindowsPrintConnector($this->printerName);
        $this->printer   = new Printer($this->connector);
    }
}

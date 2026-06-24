<?php

namespace App\Printer\Connectors;

use Mike42\Escpos\PrintConnectors\CupsPrintConnector;
use Mike42\Escpos\Printer;

class CupsConnector extends AbstractConnector
{
    public function init(): void
    {
        $this->connector = new CupsPrintConnector($this->printerName);
        $this->printer = new Printer($this->connector);
    }
}

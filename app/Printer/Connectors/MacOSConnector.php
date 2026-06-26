<?php

namespace App\Printer\Connectors;

use Mike42\Escpos\Printer;

class MacOSConnector extends AbstractConnector
{
    public function init(): void
    {
        $this->connector = new RawCupsPrintConnector($this->printerName);
        $this->printer = new Printer($this->connector);
    }
}

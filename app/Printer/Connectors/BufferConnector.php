<?php

namespace App\Printer\Connectors;

use App\Models\BusinessConfigModel;
use Mike42\Escpos\PrintConnectors\DummyPrintConnector;
use Mike42\Escpos\Printer;

/**
 * Captura los bytes ESC/POS en memoria en lugar de enviarlos a una impresora.
 * Útil para retornar el ticket al cliente (ej. agente WebSocket local).
 */
class BufferConnector extends AbstractConnector
{
    private DummyPrintConnector $buffer;

    private string $capturedBytes = '';

    public function __construct(BusinessConfigModel $tenant)
    {
        parent::__construct($tenant);
        $this->buffer = new DummyPrintConnector;
    }

    public function init(): void
    {
        $this->connector = $this->buffer;
        $this->printer = new Printer($this->buffer);
    }

    public function close(): void
    {
        // getData() debe llamarse antes de printer->close(), que invoca finalize()
        // y pone el buffer en null.
        $this->capturedBytes = $this->buffer->getData();
        $this->printer->close();
    }

    public function getBytes(): string
    {
        return $this->capturedBytes;
    }
}

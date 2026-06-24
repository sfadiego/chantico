<?php

namespace App\Printer\Factory;

use App\Printer\Interface\TicketFormatterInterface;
use App\Printer\Service\PrinterService;
use RuntimeException;

class PrinterServiceFactory
{
    /**
     * Builds a PrinterService wired with the correct connector for the current
     * environment (resolved by ConnectorFactory) and the given formatter.
     *
     * @throws RuntimeException when the printer is unreachable.
     */
    public static function make(TicketFormatterInterface $formatter): PrinterService
    {
        $connector = ConnectorFactory::make();

        if (! $connector->isActiveConnection()) {
            throw new RuntimeException('Impresora no conectada');
        }

        return new PrinterService($connector, $formatter);
    }
}

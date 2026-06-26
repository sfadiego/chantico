<?php

namespace App\Printer\Factory;

use App\Models\BusinessConfigModel;
use App\Printer\Interface\TicketFormatterInterface;
use App\Printer\Service\PrinterService;
use RuntimeException;

class PrinterServiceFactory
{
    /**
     * @throws RuntimeException when the printer is unreachable.
     */
    public static function make(TicketFormatterInterface $formatter, BusinessConfigModel $tenant): PrinterService
    {
        $connector = ConnectorFactory::make($tenant);

        if (! $connector->isActiveConnection()) {
            throw new RuntimeException('Impresora no conectada');
        }

        return new PrinterService($connector, $formatter);
    }
}

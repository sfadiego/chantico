<?php

namespace App\Printer\Factory;

use App\Models\BusinessConfigModel;
use App\Printer\Connectors\CupsConnector;
use App\Printer\Connectors\FileConnector;
use App\Printer\Connectors\NetworkConnector;
use App\Printer\Connectors\SmbclientConnector;
use App\Printer\Connectors\WindowsConnector;
use App\Printer\Interface\PrinterConnectorInterface;

class ConnectorFactory
{
    public static function make(BusinessConfigModel $tenant): PrinterConnectorInterface
    {
        $driver = env('PRINTER_DRIVER', 'network');

        return match ($driver) {
            'smbclient' => new SmbclientConnector($tenant),
            'network'   => new NetworkConnector($tenant),
            'file'      => new FileConnector($tenant),
            'linux'     => new CupsConnector($tenant),
            'macos'     => new CupsConnector($tenant),
            'cups'      => new CupsConnector($tenant),
            'windows'   => new WindowsConnector($tenant),
        };
    }
}

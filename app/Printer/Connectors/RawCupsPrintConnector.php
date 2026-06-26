<?php

namespace App\Printer\Connectors;

use Exception;
use Mike42\Escpos\PrintConnectors\PrintConnector;

/**
 * CUPS connector that sends jobs with -o raw to bypass macOS/Linux
 * CUPS filters that corrupt ESC/POS binary data.
 * The built-in CupsPrintConnector uses `lp -d printer file` which
 * routes through CUPS filters (PDF/PostScript conversion) and
 * silently destroys the ESC/POS commands.
 *
 * macOS also normalizes hyphens to underscores in CUPS queue names,
 * so "MY-PRINTER" is stored as "MY_PRINTER" — we normalize on construction.
 */
class RawCupsPrintConnector implements PrintConnector
{
    private array $buffer = [];

    private string $printerName;

    public function __construct(string $printerName)
    {
        // CUPS normalizes hyphens to underscores in queue names on macOS
        $this->printerName = str_replace('-', '_', $printerName);
    }

    public function write($data): void
    {
        $this->buffer[] = $data;
    }

    public function finalize(): void
    {
        $data = implode('', $this->buffer);
        $this->buffer = [];

        $tmpfname = tempnam(sys_get_temp_dir(), 'escpos-');
        file_put_contents($tmpfname, $data);

        $cmd = sprintf(
            '/usr/bin/lp -d %s -o raw %s 2>&1',
            escapeshellarg($this->printerName),
            escapeshellarg($tmpfname)
        );

        exec($cmd, $output, $returnCode);
        unlink($tmpfname);

        if ($returnCode !== 0) {
            throw new Exception('lp failed [printer='.$this->printerName.']: '.implode(' ', $output));
        }
    }

    public function read($len): bool
    {
        return false;
    }

    public function __destruct()
    {
        if (! empty($this->buffer)) {
            trigger_error('Print connector was not finalized. Did you forget to close the printer?', E_USER_NOTICE);
        }
    }
}

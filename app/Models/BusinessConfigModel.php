<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessConfigModel extends Model
{
    protected $table = 'business_config';

    const BUSINESS_NAME  = 'business_name';
    const PRIMARY_COLOR  = 'primary_color';
    const SIDEBAR_COLOR  = 'sidebar_color';
    const FONT_COLOR     = 'font_color';
    const LABEL_COLOR    = 'label_color';
    const LOGO_PATH      = 'logo_path';

    protected $fillable = [
        self::BUSINESS_NAME,
        self::PRIMARY_COLOR,
        self::SIDEBAR_COLOR,
        self::FONT_COLOR,
        self::LABEL_COLOR,
        self::LOGO_PATH,
    ];

    /** Retorna la fila única de configuración, creándola con valores por defecto si no existe. */
    public static function getOrCreate(): self
    {
        return self::firstOrCreate([], [
            self::BUSINESS_NAME => env('APP_FULL_NAME', 'Chantico'),
            self::PRIMARY_COLOR => '#f59e0b',
            self::SIDEBAR_COLOR => '#1c1917',
            self::FONT_COLOR    => '#1c1917',
            self::LABEL_COLOR   => '#1c1917',
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessConfigModel extends Model
{
    protected $table = 'business_config';

    const SLUG          = 'slug';
    const BUSINESS_NAME = 'business_name';
    const PRIMARY_COLOR = 'primary_color';
    const SIDEBAR_COLOR = 'sidebar_color';
    const FONT_COLOR    = 'font_color';
    const LABEL_COLOR   = 'label_color';
    const LOGO_PATH     = 'logo_path';

    protected $fillable = [
        self::SLUG,
        self::BUSINESS_NAME,
        self::PRIMARY_COLOR,
        self::SIDEBAR_COLOR,
        self::FONT_COLOR,
        self::LABEL_COLOR,
        self::LOGO_PATH,
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'tenant_id');
    }

    /** Crea el tenant por defecto si no existe (usado en seeders). */
    public static function createDefault(string $slug = 'default'): self
    {
        return self::firstOrCreate(
            [self::SLUG => $slug],
            [
                self::BUSINESS_NAME => env('APP_FULL_NAME', 'Chantico'),
                self::PRIMARY_COLOR => '#f59e0b',
                self::SIDEBAR_COLOR => '#1c1917',
                self::FONT_COLOR    => '#ffffff',
                self::LABEL_COLOR   => '#1c1917',
            ]
        );
    }
}

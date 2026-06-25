<?php

namespace App\Enums;

enum SubscriptionPlanEnum: string
{
    case Monthly  = 'monthly';
    case Biannual = 'biannual';
    case Annual   = 'annual';
    case Lifetime = 'lifetime';

    public function months(): int
    {
        return match($this) {
            self::Monthly  => 1,
            self::Biannual => 6,
            self::Annual   => 12,
            self::Lifetime => 0, // sin vencimiento
        };
    }

    public function isLifetime(): bool
    {
        return $this === self::Lifetime;
    }

    public function label(): string
    {
        return match($this) {
            self::Monthly  => 'Mensual',
            self::Biannual => 'Semestral',
            self::Annual   => 'Anual',
            self::Lifetime => 'Membresía indefinida',
        };
    }
}

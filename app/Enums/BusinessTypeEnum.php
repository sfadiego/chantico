<?php

namespace App\Enums;

enum BusinessTypeEnum: string
{
    case Restaurante = 'restaurante';
    case Carniceria = 'carniceria';
    case Polleria = 'polleria';

    public function label(): string
    {
        return match ($this) {
            self::Restaurante => 'Restaurante / Cafetería',
            self::Carniceria => 'Carnicería',
            self::Polleria => 'Pollería',
        };
    }

    /** Features habilitados por tipo de negocio */
    public function features(): array
    {
        return match ($this) {
            self::Restaurante => [
                'kitchen_view'    => true,
                'ready_to_serve'  => true,
                'sell_by_weight'  => false,
            ],
            self::Carniceria, self::Polleria => [
                'kitchen_view'    => false,
                'ready_to_serve'  => false,
                'sell_by_weight'  => true,
            ],
            default =>  [
                'kitchen_view'    => true,
                'ready_to_serve'  => true,
                'sell_by_weight'  => false,
            ],
        };
    }
}

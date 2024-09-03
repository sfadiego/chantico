<?php

namespace App\Enums;

enum RoleEnum: int
{
    case ADMIN = 1;
    case EMPLOYE = 2;

    public static function getRoleName(RoleEnum $role): string
    {
        return match ($role->value) {
            RoleEnum::ADMIN->value => 'admin',
            RoleEnum::EMPLOYE->value => 'empleado',
            default => 'empleado',
        };
    }
}

<?php

namespace App\Enums;

enum RoleEnum: int
{
    case ADMIN = 1;
    case EMPLOYE = 2;
    case SUPERADMIN = 3;

    public static function getRoleName(RoleEnum $role): string
    {
        return match ($role->value) {
            RoleEnum::ADMIN->value => 'admin',
            RoleEnum::EMPLOYE->value => 'empleado',
            RoleEnum::SUPERADMIN->value => 'superadmin',
            default => 'empleado',
        };
    }
}

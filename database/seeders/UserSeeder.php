<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            User::NOMBRE => 'Ana Gabriela',
            User::EMAIL => 'chantico@chantico.com',
            'email_verified_at' => now(),
            User::USUARIO => 'gabyZepeda',
            User::PASSWORD => bcrypt('chantico'),
            User::APELLIDO_PATERNO => 'Zepeda',
            User::APELLIDO_MATERNO => 'Trujillo',
            User::ROL_ID => RoleEnum::ADMIN,
            User::ACTIVO => 1,
        ]);
        User::create([
            User::NOMBRE => 'Empleado',
            User::APELLIDO_PATERNO => '',
            User::APELLIDO_MATERNO => '',
            User::EMAIL => 'empleado@gmail.com',
            'email_verified_at' => now(),
            User::USUARIO => 'employe',
            User::PASSWORD => bcrypt('chantico'),
            User::ROL_ID => RoleEnum::EMPLOYE,
            User::ACTIVO => 1,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\RoleModel;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            User::NOMBRE => "Diego A.",
            User::EMAIL => "correo@gmail.com",
            'email_verified_at' => now(),
            User::USUARIO => "diegosilva",
            User::PASSWORD => bcrypt('chantico'),
            User::APELLIDO_PATERNO => "Silva",
            User::APELLIDO_MATERNO => "Facio",
            User::ROL_ID => RoleModel::all()->random()->id,
            User::ACTIVO => 1
        ]);
        User::factory()->count(5)->create();
    }
}

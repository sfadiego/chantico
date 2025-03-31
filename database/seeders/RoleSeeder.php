<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\RoleModel;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            RoleEnum::getRoleName(RoleEnum::ADMIN),
            RoleEnum::getRoleName(RoleEnum::EMPLOYE),
        ];

        foreach ($roles as $role) {
            RoleModel::updateOrCreate(['role' => $role]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\BusinessConfigModel;
use Illuminate\Database\Seeder;

class BusinessConfigSeeder extends Seeder
{
    public function run(): void
    {
        $slug = env('APP_TENANT_SLUG', 'default');

        // Si ya existe un registro sin slug (migración previa), asignarle el slug
        $existing = BusinessConfigModel::whereNull('slug')->first()
            ?? BusinessConfigModel::where('slug', 'default')->first();

        if ($existing) {
            $existing->update(['slug' => $slug]);
            return;
        }

        BusinessConfigModel::firstOrCreate(
            [BusinessConfigModel::SLUG => $slug],
            [
                BusinessConfigModel::BUSINESS_NAME => env('APP_NAME', 'POS cafeteria'),
                BusinessConfigModel::PRIMARY_COLOR  => '#f59e0b',
                BusinessConfigModel::SIDEBAR_COLOR  => '#1c1917',
                BusinessConfigModel::FONT_COLOR     => '#ffffff',
                BusinessConfigModel::LABEL_COLOR    => '#1c1917',
            ]
        );
    }
}

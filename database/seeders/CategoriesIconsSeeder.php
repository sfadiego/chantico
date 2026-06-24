<?php

namespace Database\Seeders;

use App\Models\CategoryModel;
use Illuminate\Database\Seeder;

class CategoriesIconsSeeder extends Seeder
{
    public function run(): void
    {
        $icons = [
            'CAFÉ'          => 'Coffee',
            "TISANA" => 'Leaf',
            "SODA ITALIANA" => 'Sparkles',     // lucide: sparkles
            "SMOOTHIE" => 'GlassWater',        // lucide: glass-water
            "WAFFLES & CREPAS" => 'Grid',      // lucide: grid (as substitute)
            "PANINIS" => 'Sandwich',           // lucide: sandwich
            "ENSALADAS" => 'Salad',            // lucide: salad
            "POSTRES" => 'Cake',               // lucide: cake
            "OTROS" => 'Tag',                  // lucide: tag
            "FRAPPÉ" => 'IceCream',            // lucide: ice-cream
            "SÁNDWICH" => 'Sandwich',
            "EXTRAS" => 'Plus',                // lucide: plus
            "LECHITAS" => 'Milk',              // lucide: milk
            "Naturales" => 'Leaf',
            "CHOCOLATES" => 'IceCream',
            "+18" => 'Lock',                   // lucide: lock (age restricted)
            "PA PICAR" => 'Utensils',          // lucide: utensils
            "TEMPORADA" => 'Calendar',         // lucide: calendar
            "SMOOTIE" => 'GlassWater',
            "WAFFLES" => 'Grid',
        ];

        foreach ($icons as $nombre => $iconName) {
            CategoryModel::where(CategoryModel::NOMBRE, $nombre)
                ->update([CategoryModel::ICON_NAME => $iconName]);
        }
    }
}

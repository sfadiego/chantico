<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatusModel extends Model
{
    use HasFactory;
    protected $table = 'order_status';
    const NOMBRE = "nombre";
    const ICON = "icon";
    protected $fillable = [
        self::NOMBRE,
        self::ICON
    ];
}

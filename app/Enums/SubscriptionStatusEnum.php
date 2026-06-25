<?php

namespace App\Enums;

enum SubscriptionStatusEnum: string
{
    case Active  = 'active';
    case Grace   = 'grace';    // vencido dentro del período de gracia (3 días)
    case Expired = 'expired';
    case Pending = 'pending';  // nunca ha pagado
}

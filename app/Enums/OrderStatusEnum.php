<?php

namespace App\Enums;

enum OrderStatusEnum: int
{
    case IN_PROCESS = 1;
    case CANCELED = 2;
    case CLOSED = 3;

    public static function orderStatusName(OrderStatusEnum $status): string
    {
        return match ($status->value) {
            OrderStatusEnum::IN_PROCESS->value => 'in process',
            OrderStatusEnum::CANCELED->value => 'canceled',
            OrderStatusEnum::CLOSED->value => 'closed',
            default => 'in process',
        };
    }
}

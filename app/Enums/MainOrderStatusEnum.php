<?php

namespace App\Enums;

enum MainOrderStatusEnum: int
{
    case CLOSED = 0;
    case OPEN = 1;
    case CLOSE_SALES = 2;
}

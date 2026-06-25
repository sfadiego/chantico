<?php

namespace App\Enums;

enum TenantStatusEnum: string
{
    case All      = 'all';
    case Inactive = 'inactive';
    case Deleted  = 'deleted';
}

<?php

namespace App\Models\Traits;

use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 * @property int $tenant_id
 * @method static void addGlobalScope(\Illuminate\Database\Eloquent\Scope $scope)
 * @method static void creating(\Closure $callback)
 */
trait HasTenant
{
    protected static function bootHasTenant(): void
    {
        static::addGlobalScope(new TenantScope());

        static::creating(function (self $model) {
            if (empty($model->tenant_id) && app()->bound('tenant_id')) {
                $model->tenant_id = app('tenant_id');
            }
        });
    }
}

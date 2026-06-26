<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Core\Data\IndexData;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\TenantStoreRequest;
use App\Http\Requests\TenantUpdateRequest;
use App\Models\BusinessConfigModel;
use App\Models\User;
use App\Services\TenantService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class TenantManagementController extends Controller
{
    public function index(IndexData $data, TenantService $service): JsonResponse
    {
        return $service->run($data);
    }

    public function store(TenantStoreRequest $param): JsonResponse
    {
        $tenant = BusinessConfigModel::create([
            BusinessConfigModel::SLUG => $param->slug,
            BusinessConfigModel::ACTIVO => true,
            BusinessConfigModel::BUSINESS_NAME => $param->business_name,
            BusinessConfigModel::PRIMARY_COLOR => $param->primary_color,
            BusinessConfigModel::SIDEBAR_COLOR => $param->sidebar_color,
            BusinessConfigModel::FONT_COLOR => $param->font_color,
            BusinessConfigModel::LABEL_COLOR => $param->label_color,
        ]);

        User::create([
            User::NOMBRE => $param->admin_nombre,
            User::APELLIDO_PATERNO => $param->admin_apellido,
            User::APELLIDO_MATERNO => '',
            User::EMAIL => $param->admin_email,
            User::USUARIO => $param->admin_usuario,
            User::PASSWORD => bcrypt($param->admin_password),
            User::ROL_ID => RoleEnum::ADMIN->value,
            User::ACTIVO => true,
            User::TENANT_ID => $tenant->id,
        ]);

        return Response::success($tenant);
    }

    public function show(BusinessConfigModel $tenant): JsonResponse
    {
        return Response::success($tenant->loadCount('users'));
    }

    public function update(BusinessConfigModel $tenant, TenantUpdateRequest $param): JsonResponse
    {
        $tenant->update([
            BusinessConfigModel::SLUG          => $param->slug,
            BusinessConfigModel::BUSINESS_NAME => $param->business_name,
            BusinessConfigModel::PRIMARY_COLOR => $param->primary_color,
            BusinessConfigModel::SIDEBAR_COLOR => $param->sidebar_color,
            BusinessConfigModel::FONT_COLOR    => $param->font_color,
            BusinessConfigModel::LABEL_COLOR   => $param->label_color,
            BusinessConfigModel::LOGO_ICON => $param->logo_icon,
        ]);

        return Response::success($tenant);
    }

    public function toggle(BusinessConfigModel $tenant): JsonResponse
    {
        $tenant->update([BusinessConfigModel::ACTIVO => ! $tenant->activo]);

        return Response::success($tenant);
    }

    public function restore(int $tenant): JsonResponse
    {
        $model = BusinessConfigModel::onlyTrashed()->findOrFail($tenant);
        $model->restore();

        return Response::success($model);
    }

    public function delete(BusinessConfigModel $tenant): JsonResponse
    {
        return Response::success($tenant->delete());
    }
}

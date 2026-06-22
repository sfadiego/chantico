<?php

namespace App\Services;

use App\Core\Data\IndexData;
use App\Core\Paginator\DataTable;
use App\Enums\OrderStatusEnum;
use App\Models\MainOrderReportModel;
use App\Models\OrderModel;
use Illuminate\Http\JsonResponse;

class OrderService extends DataTable
{
    public function __construct(OrderModel $model)
    {
        parent::__construct($model);
    }

    public function tableHeaders(): array
    {
        return [
            'id' => '#',
            'nombre_pedido' => 'Nombre',
            'descuento' => 'Descuento',
            'subtotal' => 'Subtotal',
            'total' => 'Total',
            'created_at' => 'Fecha',
            'actions' => '#',
        ];
    }

    public function customQueryFilters(): array
    {
        return [
            'estatus_pedido_id' => OrderStatusEnum::IN_PROCESS->value,
            'sistema_id' => (new MainOrderReportModel)->getActiveSale()->id,
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::build($data);
    }
}

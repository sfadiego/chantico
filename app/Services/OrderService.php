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

    public function makeQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return $this->model->newQuery()->with('status');
    }

    public function customQueryFilters(): array
    {
        $sistemaId = request()->query('sistema_id');

        if ($sistemaId) {
            $sistema = (int) $sistemaId;
        } else {
            $activeSale = (new MainOrderReportModel)->getActiveSale();
            $sistema = $activeSale ? $activeSale->id : 0;
        }

        return [
            'sistema_id' => $sistema,
            'estatus_pedido_id' => (int) request()->query('estatus_pedido_id', OrderStatusEnum::IN_PROCESS->value),
        ];
    }

    public function runCustomQueryFilters(): \Illuminate\Database\Eloquent\Builder
    {
        parent::runCustomQueryFilters();

        $fecha = request()->query('fecha');
        if ($fecha) {
            $this->queryBuilder->whereDate('created_at', $fecha);
        }

        return $this->queryBuilder;
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::build($data);
    }
}

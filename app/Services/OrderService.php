<?php

namespace App\Services;

use App\Core\Data\IndexData;
use App\Core\Paginator\DataTable;
use App\Enums\OrderStatusEnum;
use App\Models\MainOrderReportModel;
use App\Models\OrderModel;
use Carbon\Carbon;
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
        $estatusId = (int) request()->query('estatus_pedido_id', OrderStatusEnum::IN_PROCESS->value);
        $sistemaId = request()->query('sistema_id');

        // When filtering by non-active statuses (e.g. sales history), don't restrict by session
        if (!$sistemaId && $estatusId === OrderStatusEnum::IN_PROCESS->value) {
            $activeSale = (new MainOrderReportModel)->getActiveSale();
            $sistemaId = $activeSale ? $activeSale->id : 0;
        }

        $filters = ['estatus_pedido_id' => $estatusId];

        if ($sistemaId) {
            $filters['sistema_id'] = (int) $sistemaId;
        }

        return $filters;
    }

    public function runCustomQueryFilters(): \Illuminate\Database\Eloquent\Builder
    {
        parent::runCustomQueryFilters();

        $fecha = request()->query('fecha');
        if ($fecha) {
            $tz = config('app.timezone');
            $start = Carbon::createFromFormat('Y-m-d', $fecha, $tz)->startOfDay()->utc();
            $end   = Carbon::createFromFormat('Y-m-d', $fecha, $tz)->endOfDay()->utc();
            $this->queryBuilder->whereBetween('created_at', [$start, $end]);
        }

        return $this->queryBuilder;
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::build($data);
    }
}

<?php

namespace App\Core\Paginator;

use App\Core\Data\IndexData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

class DataTable implements DataTableBuilder
{
    public ?Model $model = null;
    protected bool $withPagination = true;
    public ?Builder $queryBuilder = null;

    public function __construct(Model $model)
    {
        if (is_null($model)) {
            return;
        }
        $this->model = $model;
    }

    public function tableHeaders(): array
    {
        return [];
    }

    public function makeQuery(): Builder
    {
        return $this->model->newQuery();
    }

    public function customQueryFilters(): array
    {
        return [];
    }

    public function runCustomQueryFilters(): Builder
    {
        foreach ($this->customQueryFilters() as $key => $value) {
            $this->queryBuilder->where($key, $value);
        }

        return $this->queryBuilder;
    }

    public function build(IndexData $data): JsonResponse
    {

        if (is_null($this->model)) {
            return Response::error('Modelo no definido');
        }

        $this->queryBuilder = $this->makeQuery();

        if (! empty($this->customQueryFilters())) {
            $this->runCustomQueryFilters();
        }

        $this->orderQuery($data->orderParam, $data->order);

        if ($this->withPagination) {
            $paginator = $this->queryBuilder->paginate($data->perPage, ['*'], 'page', $data->page);

            return Response::successDataTable(
                new LengthAwarePaginator(
                    $paginator->getCollection(),
                    $paginator->total(),
                    $paginator->perPage(),
                    $paginator->currentPage()
                ),
                $this->tableHeaders()
            );
        }

        $results = $this->queryBuilder->get();
        return Response::success($results);
    }

    protected function orderQuery(string $orderParam, string $order): Builder
    {
        return $this->queryBuilder->orderBy($orderParam, $order);
    }
}

<?php

namespace App\Core\Paginator;

use App\Core\Data\IndexData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

interface DataTableBuilder
{
    public function tableHeaders(): array;

    public function customQueryFilters(): array;

    public function makeQuery(): Builder;

    public function build(IndexData $data): JsonResponse;
}

<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Enums\SubscriptionPlanEnum;
use App\Enums\SubscriptionStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubscriptionStoreRequest;
use App\Models\BusinessConfigModel;
use App\Models\SubscriptionModel;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class SubscriptionController extends Controller
{
    /**
     * All tenants with their latest subscription status.
     */
    public function index(): JsonResponse
    {
        $tenants = BusinessConfigModel::withoutTrashed()
            ->with('latestSubscription')
            ->withCount('users')
            ->orderBy(BusinessConfigModel::BUSINESS_NAME)
            ->get();

        return Response::success($tenants->map(fn ($t) => $this->formatTenant($t)));
    }

    /**
     * Register a payment for a tenant (creates a new subscription record).
     */
    public function store(BusinessConfigModel $tenant, SubscriptionStoreRequest $request): JsonResponse
    {
        $plan      = SubscriptionPlanEnum::from($request->plan);
        $startsAt  = Carbon::parse($request->starts_at);

        SubscriptionModel::createFromPlan(
            tenantId: $tenant->id,
            plan: $plan,
            startsAt: $startsAt,
            amount: $request->amount,
            notes: $request->notes,
        );

        return Response::success($this->formatTenant($tenant->fresh('latestSubscription')));
    }

    /**
     * Payment history for a single tenant.
     */
    public function history(BusinessConfigModel $tenant): JsonResponse
    {
        $history = SubscriptionModel::where('tenant_id', $tenant->id)
            ->orderByDesc('paid_at')
            ->get()
            ->map(fn ($s) => $this->formatSubscription($s));

        return Response::success($history);
    }

    private function formatTenant(BusinessConfigModel $tenant): array
    {
        $sub = $tenant->latestSubscription;

        return [
            'id'            => $tenant->id,
            'business_name' => $tenant->business_name,
            'slug'          => $tenant->slug,
            'activo'        => $tenant->activo,
            'primary_color' => $tenant->primary_color,
            'users_count'   => $tenant->users_count,
            'subscription'  => $sub ? $this->formatSubscription($sub) : null,
            'subscription_status' => $sub
                ? $sub->status
                : SubscriptionStatusEnum::Pending->value,
        ];
    }

    private function formatSubscription(SubscriptionModel $sub): array
    {
        return [
            'id'             => $sub->id,
            'plan'           => $sub->plan,
            'is_lifetime'    => $sub->is_lifetime,
            'starts_at'      => $sub->starts_at->toDateString(),
            'expires_at'     => $sub->is_lifetime ? null : $sub->expires_at->toDateString(),
            'paid_at'        => $sub->paid_at?->toIso8601String(),
            'amount'         => $sub->amount,
            'notes'          => $sub->notes,
            'status'         => $sub->status,
            'days_remaining' => $sub->days_remaining, // null para lifetime
        ];
    }
}

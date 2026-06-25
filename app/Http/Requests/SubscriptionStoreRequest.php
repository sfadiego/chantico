<?php

namespace App\Http\Requests;

use App\Enums\SubscriptionPlanEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class SubscriptionStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'plan'       => ['required', new Enum(SubscriptionPlanEnum::class)],
            'starts_at'  => 'required|date',
            'amount'     => 'nullable|numeric|min:0',
            'notes'      => 'nullable|string|max:300',
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Models\OrderProductModel;
use Illuminate\Foundation\Http\FormRequest;

class OrderProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            OrderProductModel::DESCUENTO => 'nullable|between:1,100',
            OrderProductModel::CANTIDAD => 'required|between:1,10'
        ];
    }
}

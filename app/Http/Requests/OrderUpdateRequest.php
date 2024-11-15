<?php

namespace App\Http\Requests;

use App\Models\OrderModel;
use Illuminate\Foundation\Http\FormRequest;

class OrderUpdateRequest extends FormRequest
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
            OrderModel::DESCUENTO => 'numeric|between:1,100',
            OrderModel::NOMBRE_PEDIDO => 'nullable',
            OrderModel::ESTATUS_PEDIDO_ID => 'nullable|exists:order_status,id',
        ];
    }
}
<?php

namespace App\Http\Requests;

use App\Models\OrderProductModel;
use Illuminate\Foundation\Http\FormRequest;

class OrderProductStoreRequest extends FormRequest
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
            OrderProductModel::DESCUENTO => 'nullable|min:0|max:99',
            OrderProductModel::CANTIDAD => 'required|min:1|max:10',
            OrderProductModel::PRODUCTO_ID => 'required|exists:product,id',
            OrderProductModel::PRECIO => 'required',
        ];
    }
}

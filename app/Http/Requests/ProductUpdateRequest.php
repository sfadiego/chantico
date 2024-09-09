<?php

namespace App\Http\Requests;

use App\Models\ProductModel;
use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
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
            ProductModel::NOMBRE => 'nullable',
            ProductModel::PRECIO => 'nullable|decimal:0,2',
            ProductModel::DESCRIPCION => 'nullable',
            ProductModel::CATEGORIA_ID => 'nullable|exists:categories,id',
            ProductModel::ACTIVO => 'boolean',
            ProductModel::FOTO_ID => 'nullable|exists:product_image'
        ];
    }
}

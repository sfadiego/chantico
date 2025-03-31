<?php

namespace App\Http\Requests;

use App\Models\CategoryModel;
use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
            CategoryModel::NOMBRE => 'required|unique:categories,nombre',
            CategoryModel::ORDEN => 'nullable|numeric',
            CategoryModel::FOTO_ID => 'nullable',
        ];
    }
}

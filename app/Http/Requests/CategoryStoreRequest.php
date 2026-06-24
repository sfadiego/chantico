<?php

namespace App\Http\Requests;

use App\Models\CategoryModel;
use Illuminate\Foundation\Http\FormRequest;

class CategoryStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            CategoryModel::NOMBRE => 'required|unique:categories,nombre',
            CategoryModel::ORDEN => 'nullable|numeric',
            CategoryModel::FOTO_ID => 'nullable',
            CategoryModel::ICON_NAME => 'nullable|string',
        ];
    }
}

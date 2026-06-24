<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessConfigUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'business_name' => 'required|string|max:100',
            'primary_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'sidebar_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'font_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'label_color' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
        ];
    }
}

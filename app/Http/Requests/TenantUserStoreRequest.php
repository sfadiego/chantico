<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class TenantUserStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:100',
            'apellido_paterno' => 'required|string|max:100',
            'apellido_materno' => 'nullable|string|max:100',
            'email' => 'required|email|unique:users,email',
            'usuario' => 'required|string|max:80|unique:users,usuario',
            'password' => 'required|string|min:8',
            'rol_id' => ['required', new Enum(RoleEnum::class)],
            'activo' => 'boolean',
        ];
    }
}

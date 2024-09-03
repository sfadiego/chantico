<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            User::NOMBRE => 'required',
            User::EMAIL => 'required|unique:users',
            User::USUARIO => 'required|unique:users',
            User::APELLIDO_MATERNO => 'required',
            User::APELLIDO_PATERNO => 'nullable|string',
            User::ROL_ID => 'required|exists:role',
            'password' => 'required|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,}$/|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
        ];
    }

    public function attributes(): array
    {
        return [
            User::NOMBRE => 'nombre',
            // User::EMAIL => 'required|unique:users',
            // User::USUARIO => 'required|unique:users',
            // User::APELLIDO_MATERNO => 'required',
            // User::APELLIDO_PATERNO => 'nullable|string',
            // User::ROL_ID => 'required|exists:role',
            // 'password' => 'required|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,}$/|confirmed',
            // 'password_confirmation' => 'required_with:password|same:password',
        ];
    }
}

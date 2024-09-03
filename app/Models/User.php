<?php

namespace App\Models;

use App\Http\Requests\AuthenticationRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    const NOMBRE = "nombre";
    const APELLIDO_MATERNO = "apellido_materno";
    const APELLIDO_PATERNO = "apellido_paterno";
    const ROL_ID = "rol_id";
    const ACTIVO = "activo";
    const EMAIL = "email";
    const USUARIO = "usuario";
    const PASSWORD = "password";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        self::NOMBRE,
        self::EMAIL,
        self::USUARIO,
        self::APELLIDO_MATERNO,
        self::APELLIDO_PATERNO,
        self::ROL_ID,
        self::ACTIVO,
        self::PASSWORD
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // public function register(AuthenticationRequest $parameters): JsonResponse {}
    // public function login($parameters): JsonResponse {}

    public static function generateAccessToken($user)
    {
        return $user->createToken('access_token')->plainTextToken;
    }
}

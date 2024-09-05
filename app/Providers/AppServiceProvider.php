<?php

namespace App\Providers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('success', function (mixed $data, string $message = null): JsonResponse {
            return Response::json([
                'success' => true,
                'message' => $message,
                'data' => $data,
            ]);
        });

        Response::macro('error', function (string $message, mixed $data = null): JsonResponse {
            return Response::json([
                'success' => false,
                'message' => $message !== '' ? $message :  '',
                'data' => $data,
            ]);
        });

        Response::macro('unauthenticated', function (): JsonResponse {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthenticated'
            ], 401);
        });

        Response::macro('unauthorized', function (): JsonResponse {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        });
    }
}

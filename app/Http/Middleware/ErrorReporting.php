<?php

namespace App\Http\Middleware;

use App\Models\ErrorReporting as ModelsErrorReporting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ErrorReporting
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $status = $response->getStatusCode();

        if ($status === 500) {
            Log::error('Fatal Error', [
                'endpoint' => $request->path(),
                'method' => $request->method(),
                'error_message' => $response->exception?->getMessage() ?? 'Unknown error',
            ]);
        }

        if ($status > 400) {
            ModelsErrorReporting::create([
                'source' => 'backend',
                'endpoint' => $request->path(),
                'method' => $request->method(),
                'status_code' => $status,
                'error_message' => $response->exception?->getMessage() ?? 'Unknown error',
                'request_payload' => $request->except(['password', 'password_confirmation']),
                'response_body' => $response->getContent(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
            ]);
        }

        return $response;
    }
}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ env('APP_NAME') }}</title>
    @routes
    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
</head>

<body>
    <div id="root">
        <noscript>
            <strong>
                Lo sentimos, este sitio no funciona correctamente sin Javascript. Habilitalo para poder
                continuar
            </strong>
        </noscript>
    </div>
</body>
</html>

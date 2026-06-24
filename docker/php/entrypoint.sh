#!/usr/bin/env sh
set -e

APP_DIR="/var/www/html"

# setup laravel
/usr/local/bin/laravel_setup.sh || echo "Aviso: Falló el setup de Laravel"

# --- inicio ---
cd "$APP_DIR" || exit 1

# Ejecutar el comando que se pase al contenedor (por defecto php-fpm)
exec "$@"

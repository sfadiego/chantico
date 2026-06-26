# ── Stage 1: build frontend ──────────────────────────────────────────────────
FROM node:22-alpine AS frontend

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ── Stage 2: PHP / Laravel ────────────────────────────────────────────────────
FROM php:8.4-fpm AS php

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    mariadb-client \
    libzip-dev \
    libonig-dev \
    unzip \
    zip \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip gd \
    && rm -rf /var/lib/apt/lists/*

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Entrypoint
COPY docker/php/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

WORKDIR /var/www/html

# Copiar código fuente
COPY --chown=www-data:www-data . .

# Copiar assets compilados del stage frontend
COPY --from=frontend --chown=www-data:www-data /app/public/build ./public/build

# Instalar dependencias PHP de producción
RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN mkdir -p /var/www/.cache storage/framework/sessions storage/framework/views \
    storage/framework/cache storage/logs bootstrap/cache \
    && chown -R www-data:www-data /var/www/html /var/www/.cache \
    && chmod -R 775 storage bootstrap/cache

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]

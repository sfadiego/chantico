# Chantico

Chantico es un proyecto de Laravel que permite gestionar las ventas de un cafeteria.

## Entorno de Desarrollo

copiar el archivo `.env.example` a `.env` y ajustar los valores de las variables de entorno.

## Docker

Para ejecutar el proyecto se debe usar los comandos:

```bash
docker compose up --build -d
```

Para detener el proyecto se debe usar el comando:

```bash
docker compose down
```

### Migrations
se agrego columna correr migraciones

```
php artisan migrate
```

### Seeds

se agregaron iconos, correr manualmente 
```
php artisan db:seed --class=CategoriesIconsSeeder
php artisan db:seed --class={SeederName}
```
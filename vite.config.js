import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

export default defineConfig({
    build: {
        minify: process.env.APP_ENV === 'production' ? 'esbuild' : false,
        cssMinify: process.env.APP_ENV === 'production',
    },
    plugins: [laravel(["resources/js/app.tsx"]), react()],
    resolve: {
        alias: {
            '@css': '/resources/css',
            '@components': '/resources/js/components',
            '@assets': '/resources/assets',
            '@js': '/resources/js',
        },
    },
});

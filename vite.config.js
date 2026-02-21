import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import "dotenv/config";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@css": "/resources/css",
            "@assets": path.resolve(__dirname, "resources/assets"),
            "@components": "/resources/js/components",
            "@resources": "/resources/js",
            "@hooks": "/resources/js/hooks",
        },
    },
});

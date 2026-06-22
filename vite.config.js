import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import "dotenv/config";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@/": path.resolve(__dirname, "resources/js") + "/",
            "@css": "/resources/css",
            "@assets": path.resolve(__dirname, "resources/assets"),
            "@components": "/resources/js/components",
            "@resources": "/resources/js",
            "@hooks": "/resources/js/hooks",
        },
    },
});

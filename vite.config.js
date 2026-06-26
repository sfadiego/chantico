import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    "vendor-react": ["react", "react-dom", "react-router-dom"],
                    "vendor-query": ["@tanstack/react-query"],
                    "vendor-mantine": ["@mantine/core", "mantine-datatable"],
                    "vendor-form": ["formik", "yup"],
                    "vendor-ui": ["sweetalert2", "react-toastify"],
                    "vendor-icons": ["lucide-react"],
                    "vendor-axios": ["axios"],
                },
            },
        },
    },
    server: {
        host: "localhost",
        port: 5173,
        hmr: {
            host: "localhost",
        },
    },
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

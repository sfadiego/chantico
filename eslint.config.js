import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
    // 1. Ignorar carpetas primero
    {
        ignores: [
            "vendor/**",
            "node_modules/**",
            "public/**",
            "bootstrap/ssr/**",
            "tailwind.config.js",
        ],
    },
    // 2. Configuración base para JS y TS
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,

    // 3. Configuración de React
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        ...pluginReact.configs.flat.recommended, // Cargamos la recomendada de React
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            "react-hooks": pluginReactHooks,
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["error", {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
            }],
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
    // 4. Prettier siempre al final para desactivar reglas de formato
    prettier,
    {
        plugins: {
            "unused-imports": unusedImports,
        },
        rules: {
            "no-unused-vars": "off", // Desactivamos la regla base para que no choque
            "unused-imports/no-unused-imports": "error", // Esta es la que borra al hacer --fix
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
        },
    },
];

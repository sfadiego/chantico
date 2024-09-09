import React from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const root = document.getElementById('app');
const appRoot = root && createRoot(root);

const queryClient = new QueryClient()
// routes
import routes from './router/routes';
const router = createBrowserRouter(routes);

appRoot && appRoot.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>

            </RouterProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

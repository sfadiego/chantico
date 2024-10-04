import React from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import routes from './router/routes';
const root = document.getElementById('app');
const appRoot = root && createRoot(root);

const queryClient = new QueryClient()
// routes
import { AxiosProvider } from './contexts/AxiosContext';
const router = createBrowserRouter(routes);

appRoot && appRoot.render(
    <React.StrictMode>
        <AxiosProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
                <ToastContainer
                    hideProgressBar
                    draggable={false}
                    closeOnClick />
            </QueryClientProvider>
        </AxiosProvider>
    </React.StrictMode>
);

import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './router/index.routes';

const root = document.getElementById('app');
const appRoot = root && createRoot(root);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})
// routes
import { AxiosProvider } from './contexts/AxiosContext';

appRoot && appRoot.render(
    <React.StrictMode>
        <AxiosProvider>
            <QueryClientProvider client={queryClient}>
                <Suspense>
                    <RouterProvider router={routes}></RouterProvider>
                    <ToastContainer
                        hideProgressBar
                        autoClose={2000}
                        draggable={false}
                        closeOnClick />
                </Suspense>
            </QueryClientProvider>
        </AxiosProvider>
    </React.StrictMode>
);

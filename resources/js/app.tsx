import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AxiosProvider } from "./contexts/AxiosContext";
import { router } from "./router/routes";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const toastConfig = {
    hideProgressBar: true,
    autoClose: 1000,
    position: "bottom-right" as const,
    draggable: false,
    closeOnClick: true,
};

export const App = () => {
    return (
        <AxiosProvider>
            <MantineProvider>
                <QueryClientProvider client={queryClient}>
                    <Suspense>
                        <ToastContainer {...toastConfig} />
                        <RouterProvider router={router} />
                    </Suspense>
                </QueryClientProvider>
            </MantineProvider>
        </AxiosProvider>
    );
};

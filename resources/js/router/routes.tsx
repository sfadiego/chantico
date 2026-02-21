import React, { lazy } from "react";
import { authRoutes } from "./modules/auth.routes";
import IRoute from "@/intefaces/IRoutes";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/Layouts/AppLayout";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { adminRoutes } from "./modules/admin.routes";

// export enum BaseRoutes {
//     Index = "/",
//     Forbidden = "/forbidden",
//     Error = "*",
// }

// const ERROR404 = lazy(() => import("../pages/Error404"));

// export default [
//     {
//         path: BaseRoutes.Index,
//         element: <></>,
//         private: true,
//     },
//     ...AuthRoutes,
//     ...AdminRoutes,
//     ...UserRoutes,
//     {
//         path: BaseRoutes.Error,
//         element: <ERROR404 />,
//     },
//     {
//         path: BaseRoutes.Forbidden,
//         element: <ERROR404 />,
//     },
// ];

const routes: IRoute[] = [...authRoutes, ...adminRoutes].map(
    (route: IRoute) => {
        const element =
            route.layout === "blank" ? (
                route.element
            ) : (
                <AppLayout>{route.element}</AppLayout>
            );

        return {
            ...route,
            element: route?.private ? (
                <PrivateRoute route={route} element={element} />
            ) : (
                element
            ),
        };
    },
);

export const router = createBrowserRouter(routes);

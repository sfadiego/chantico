import React, { lazy } from "react";
import { AuthRoutes } from "./modules/auth.routes";
import { UserRoutes } from "./modules/users.routes";
import { AdminRoutes } from "./modules/admin.routes";

export enum BaseRoutes {
    Index = '/',
    Forbidden = '/forbidden',
    Error = '*',
};

const ERROR404 = lazy(() => import('../pages/Error404'))

export default [
    {
        path: BaseRoutes.Index,
        element: <></>,
        private: true
    },
    ...AuthRoutes,
    ...AdminRoutes,
    ...UserRoutes,
    {
        path: BaseRoutes.Error,
        element: <ERROR404 />,
    },
    {
        path: BaseRoutes.Forbidden,
        element: <ERROR404 />,
    },
];
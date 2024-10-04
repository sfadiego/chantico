import React from "react";
import { AuthRoutes } from "./modules/auth.routes";
import { UserRoutes } from "./modules/users.routes";
import Error404 from "../pages/Error404";
import { AdminRoutes } from "./modules/admin.routes";

export enum BaseRoutes {
    Index = '/',
    Forbidden = '/forbidden',
    Error = '*',
};

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
        element: <Error404 />,
    },
    {
        path: BaseRoutes.Forbidden,
        element: <Error404 />,
    },
];
import React from "react";
import { AuthRoutes } from "./modules/auth.routes";
import { UserRoutes } from "./modules/users.routes";
import Error404 from "../pages/Error404";

export enum Routes {
    Index = '/',
    Forbidden = '/forbidden',
    Error = '*',
};

export default [
    {
        path: Routes.Index,
        element: <></>,
    },
    ...AuthRoutes,
    ...UserRoutes,
    {
        path: Routes.Error,
        element: <Error404 />,
    },
    {
        path: Routes.Forbidden,
        element: <Error404 />,
    },
];
// export default routes;
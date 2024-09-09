import React from "react";
import { AuthRoutes } from "./auth/auth.routes";

export enum Routes {
    Index = '/'
};

let routes = [
    {
        path: Routes.Index,
        element: <></>,
    },
    ...AuthRoutes
];
export default routes;
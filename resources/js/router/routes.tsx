import React from "react";
import { AuthRoutes } from "./modules/auth.routes";
import { UserRoutes } from "./modules/users.routes";
import Error404 from "../pages/Error404";
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

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

// export default router;

// let finalRoutes = router.map(route => {
//     return {
//         ...route,
//         element: route.private ? (
//             <PrivateRoute route={route} element={route.element} />
//         ) : (route.element)
//     }
// });

// // console.log(finalRoutes);
// export default finalRoutes;
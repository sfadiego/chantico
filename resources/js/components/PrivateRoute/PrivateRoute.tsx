import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAxios } from '@hooks/useAxios';
import IRoute from '@/intefaces/IRoutes';
import { AuthRoutesEnum } from '@/router/modules/auth.routes';
import { BaseRoutes } from '@/router/routes';

const PrivateRoute = ({ route, element }: { route: IRoute, element: React.ReactElement }) => {
    const { isAuthenticated, user } = useAxios();

    if (!isAuthenticated) return <Navigate to={AuthRoutesEnum.Login} />
    if (route.hasPermission != undefined && !route.hasPermission(user!)) {
        return <Navigate to={BaseRoutes.Forbidden} />
    }

    return element;
}

export default PrivateRoute;
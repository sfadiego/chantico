import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import routes from './routes'

const finalRoutes = routes.map(route => {
    return {
        ...route,
        element: route.private ? (
            <PrivateRoute route={route} element={route.element} />
        ) : (route.element)
    }
});

const router = createBrowserRouter(finalRoutes);
export default router;
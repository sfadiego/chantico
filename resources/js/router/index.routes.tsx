import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import routes from './routes'

let finalRoutes = routes.map(route => {
    return {
        ...route,
        element: route.private ? (
            <PrivateRoute route={route} element={route.element} />
        ) : (route.element)
    }
});

export default finalRoutes;
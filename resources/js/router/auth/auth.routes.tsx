import LoginForm from '@js/pages/Auth/Login';
import Register from '@js/pages/Auth/Register';

export const AuthRoutes = [
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];
import LoginForm from '@resources/pages/Auth/Login';
import Register from '@resources/pages/Auth/Register';

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
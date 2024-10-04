import LoginForm from '@resources/pages/Auth/Login';
import Register from '@resources/pages/Auth/Register';

export enum AuthRoutesEnum {
    Login = '/login',
    Register = '/register',
}

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
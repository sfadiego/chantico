import { lazy, React } from 'react';
const LoginForm = lazy(() => import('@resources/pages/Auth/Login'))
const Register = lazy(() => import('@resources/pages/Auth/Register'))

export enum AuthRoutesEnum {
    Login = '/login',
    Register = '/register',
}

export const AuthRoutes = [
    {
        path: AuthRoutesEnum.Login,
        element: <LoginForm />,
    },
    {
        path: AuthRoutesEnum.Register,
        element: <Register />,
    },
];
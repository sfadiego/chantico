import IRoute from "@/intefaces/IRoutes";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/Auth/RegisterPage"));

export enum AuthRoutes {
    Login = "/login",
    Register = "/register",
}

export const authRoutes: IRoute[] = [
    {
        path: AuthRoutes.Login,
        // name: "Login",
        layout: "blank",
        element: <LoginPage />,
    },
    {
        path: AuthRoutes.Register,
        // name: "Register",
        layout: "blank",
        element: <RegisterPage />,
    },
];

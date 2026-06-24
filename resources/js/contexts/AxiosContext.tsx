import axiosApi from "@/configs/axiosConfig";
import { createContext, useCallback, useEffect, useState } from "react";
import { IAuthContextType } from "./interfaces/IAuthContextType";
import { IAuthProviderProps } from "./interfaces/IAuthProviderProps";
import { IUser } from "@/models/IUser";

export const AxiosContext = createContext<IAuthContextType | undefined>(
    undefined,
);

export const AxiosProvider = ({ children }: IAuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>(
        localStorage.getItem("authToken"),
    );
    const [user, setUser] = useState<IUser | null>(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")!)
            : null,
    );
    const [sistemaId, setSistemaId] = useState<number | null>(() => {
        const stored = Number(localStorage.getItem("sistemaId"));
        return stored > 0 ? stored : null;
    });

    const configureAxiosHeaders = (token: string | null) => {
        if (token) {
            axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("authToken", token);
        } else {
            delete axiosApi.defaults.headers.common["Authorization"];
            localStorage.removeItem("authToken");
        }
        setAuthToken(token);
    };

    const configUser = (user: IUser | null) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        setUser(user);
    };

    const setSistema = (sistema: number | null) => {
        const value = sistema && sistema > 0 ? sistema : null;
        localStorage.setItem("sistemaId", value?.toString() ?? "");
        setSistemaId(value);
    };

    const logout = useCallback(() => {
        configureAxiosHeaders(null);
        configUser(null);
        setSistema(null);
        const slug = localStorage.getItem("tenantSlug");
        window.location.replace(slug ? `/${slug}/login` : "/login");
    }, []);

    const saveAuth = useCallback((accessToken: string, user: IUser) => {
        configureAxiosHeaders(accessToken);
        configUser(user);
    }, []);

    // Sincroniza el header de axios cuando el token cambia
    useEffect(() => {
        if (authToken) {
            axiosApi.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        }
    }, [authToken]);

    // Interceptor de respuesta: redirige al login en cualquier 401
    useEffect(() => {
        const interceptorId = axiosApi.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            },
        );
        return () => {
            axiosApi.interceptors.response.eject(interceptorId);
        };
    }, [logout]);

    useEffect(() => {
        if (sistemaId) {
            setSistema(sistemaId);
        }
    }, [sistemaId]);

    const isAuth = !!authToken;

    const value = {
        authToken,
        isAuth,
        user,
        axiosApi,
        saveAuth,
        sistemaId,
        logout,
        setSistema,
    };

    return (
        <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
    );
};

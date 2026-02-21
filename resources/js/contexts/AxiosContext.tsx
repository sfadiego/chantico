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

    const [sistemaId, setSistemaId] = useState<number>(
        localStorage.getItem("sistemaId")
            ? Number(localStorage.getItem("sistemaId"))
            : 0,
    );

    const logout = useCallback(() => {
        configureAxiosHeaders(null);
        configUser(null);
        setSistema(null);
        window.location.replace("/login");
    }, []);

    useEffect(() => {
        if (sistemaId) {
            setSistema(sistemaId);
        }
    }, [sistemaId]);

    //TODO: reestructurar componentes para dejar el interceptor aqui
    // useEffect(() => {
    //     const responseInterceptor = axiosApi.interceptors.response.use(
    //         (response) => {
    //             if (
    //                 response.status === 200 &&
    //                 response.config.responseType != "blob"
    //             ) {
    //                 response.data = response.data.data;
    //             }
    //             return response;
    //         },
    //         (error) => {
    //             if (error.response && error.response.status === 401) {
    //                 logout();
    //             }
    //             return Promise.reject(error);
    //         },
    //     );

    //     return () => {
    //         axiosApi.interceptors.response.eject(responseInterceptor);
    //     };
    // }, [logout]);

    useEffect(() => {
        if (authToken) {
            axiosApi.defaults.headers.common["Authorization"] =
                `Bearer ${authToken}`;
        }
    }, [authToken]);

    // TODO: revisar, por que no se usa o implementar
    const updateUser = useCallback((user: IUser) => {
        configUser(user);
    }, []);

    const setSistema = (sistema: number | null) => {
        const value = sistema ?? 0;
        localStorage.setItem("sistemaId", value.toString());
        setSistemaId(value);
    };

    const configureAxiosHeaders = (token: string | null) => {
        if (token) {
            axiosApi.defaults.headers.common["Authorization"] =
                `Bearer ${token}`;
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

    const saveAuth = (accessToken: string, user: IUser) => {
        try {
            configureAxiosHeaders(accessToken);
            configUser(user);
        } catch (error) {
            console.error("Error de autenticación", error);
            throw error;
        }
    };

    const isAuth = !!authToken;

    const value = {
        authToken,
        isAuth,
        user,
        axiosApi,
        saveAuth,
        //revisar estos valores
        sistemaId,
        logout,
        setSistema,
    };

    return (
        <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
    );
};

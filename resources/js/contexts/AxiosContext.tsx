import { createContext, ReactNode, useEffect, useState } from "react"
import { axiosApi } from '../configs/axiosConfig'
import { IUser } from "@resources/intefaces/IUser"
import { IAuthContextType } from "./interfaces/IAuthContextType"

export const AxiosContext = createContext<IAuthContextType | undefined>(undefined)

interface IAuthProviderProps {
    children: ReactNode
}

export const AxiosProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUserState] = useState<IUser | null>(
        localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')!)
            : null,
    )

    const [authToken, setAuthToken] = useState<string | null>(
        localStorage.getItem('authToken'),
    )

    useEffect(() => {
        if (authToken) {
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
        }
    }, [authToken])

    //TODO: revisar si se necesita volver a hacer request de usuario y setear valores en localStorage

    const setAxiosHeaders = (token: string | null) => {
        if (token) {
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token);
            setAuthToken(token)
        } else {
            delete axiosApi.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
        }
    }

    const setUser = (user: IUser | null) => {
        localStorage.setItem('user', JSON.stringify(user));
        user ? localStorage.setItem('user', JSON.stringify(user))
            : localStorage.removeItem('user');

        setUserState(user);
    }

    // guardar el token y el usuario logeado
    const saveAuth = (token: string, user: IUser) => {
        try {
            setAxiosHeaders(token);
            setUser(user);
        } catch (error) {
            console.log("saveAuth-error:", error);
            throw error;
        }
    }

    const logout = () => {
        setAxiosHeaders(null)
        setUser(null)
        window.location.replace('/login')
    }
    //regresa si el usuario esta autenticado
    const isAuthenticated = !!authToken;
    const value = {
        authToken,
        user,
        isAuthenticated,
        axiosApi,
        saveAuth,
        logout
    };

    return <AxiosContext.Provider value={value}> {children} </AxiosContext.Provider>
}
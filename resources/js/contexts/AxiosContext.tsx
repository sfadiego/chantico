import { createContext, ReactNode, useState } from "react"
import { axiosApi } from '../configs/axiosConfig'
import { IUser } from "@resources/intefaces/IUser"
import { IAuthContextType } from "./interfaces/IAuthContextType"

export const AxiosContext = createContext<IAuthContextType | undefined>(undefined)

interface IAuthProviderProps {
    children: ReactNode
}

export const AxiosProvider = ({ children }: IAuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>(
        localStorage.getItem('authToken'),
    )

    // guardar el token y el usuario logeado
    const saveAuth = (token: string, user: IUser) => {
        try {
            
        } catch (error) {
            console.log("saveAuth:", error);
            throw error;
        }
    }

    //regresa si el usuario esta autenticado
    const isAuthenticated = !!authToken
    const value = {
        authToken,
        isAuthenticated,
        axiosApi,
        saveAuth
    };

    return <AxiosContext.Provider value={value}> {children} </AxiosContext.Provider>
}
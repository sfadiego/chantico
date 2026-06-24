import { IUser } from "@/models/IUser";
import { AxiosInstance } from "axios";

export interface IAuthContextType {
    authToken: string | null;
    isAuth: boolean;
    user: IUser | null;
    axiosApi: AxiosInstance;
    saveAuth: (accessToken: string, user: IUser) => void;
    //TODO: revisar variables
    sistemaId: number | null;
    logout: () => void;
    setSistema: (sistema: number | null) => void;
}

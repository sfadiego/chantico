import { AxiosInstance } from 'axios';
import { IUser } from '../../intefaces/IUser';

export interface IAuthContextType {
    authToken: string | null,
    isAuthenticated: boolean,
    user: IUser | null,
    axiosApi: AxiosInstance,
    sistemaId: number,
    logout: () => void,
    setSistema: (sistema: number|null) => void,
}
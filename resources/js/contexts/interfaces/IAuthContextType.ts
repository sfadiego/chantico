import { AxiosInstance } from 'axios';

export interface IAuthContextType {
    authToken: string | null,
    axiosApi: AxiosInstance,
}


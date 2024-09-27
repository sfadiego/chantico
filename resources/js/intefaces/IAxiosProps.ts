import { AxiosRequestConfig } from 'axios';

export interface IAxiosProps<Params> {
    url: string
    params?: Params
    headers?: AxiosRequestConfig['headers']
    responseType?: AxiosRequestConfig['responseType']
}

export interface IUseGetProps {
    url: string
    filters?: object
    // enable?: boolean
    // nameQuery?: string | null
    params?: object
    headers?: AxiosRequestConfig['headers']
    responseType?: AxiosRequestConfig['responseType']
}
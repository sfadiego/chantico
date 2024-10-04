import { AxiosRequestConfig } from 'axios';

export interface IAxiosProps<Params> {
    url: string
    params?: Params
    headers?: AxiosRequestConfig['headers']
    responseType?: AxiosRequestConfig['responseType']
}

export interface IAxiosPostProps<Data, Params> {
    url: string
    data?: Data,
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

export interface IUsePostProps {
    url: string,
    // params?: object,
    onSuccess?: () => void
    onError?: () => void
    isFile?: boolean
}
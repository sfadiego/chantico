import { AxiosInstance, AxiosResponse } from 'axios';
import { IAxiosPostProps, IAxiosProps, IUseGetProps, IUsePostProps } from './../intefaces/IAxiosProps';
import { ApisEnum } from '@/configs/apisEnum';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAxios } from "@hooks/useAxios";
import { IUseDELETEProps, IUsePUTProps } from '../intefaces/IAxiosProps';

const host = ApisEnum.BaseUrl;
const headersImage = { 'content-type': 'multipart/form-data' }
export const axiosGET = async <Params>(
    axios: AxiosInstance,
    { url, params, headers = {}, responseType = 'json' }: IAxiosProps<Params>,
) => {
    const response = await axios.get(`${host}${url}`, {
        params,
        headers,
        responseType,
    })
    return response.data;
}

export const axiosPOST = <Data, Paras>(
    axios: AxiosInstance,
    { url, data, params, headers = {} }: IAxiosPostProps<Data, Paras>,
) => {
    return axios.post(`${host}${url}`, data, {
        params,
        headers,
    })
}

export const axiosPUT = <Data, Paras>(
    axios: AxiosInstance,
    { url, data, params, headers = {} }: IAxiosPostProps<Data, Paras>,
) => {
    return axios.put(`${host}${url}`, data, {
        params,
        headers,
    })
}

export const axiosDELETE = <Params>(
    axios: AxiosInstance,
    { url }: IAxiosProps<Params>,
) => {
    return axios.delete(`${host}${url}`)
}


export const useGET = <Response>({
    url,
    filters = {},
    headers = {},
    responseType = 'json',
    enable = true
}: IUseGetProps): UseQueryResult<Response> => {
    const { axiosApi } = useAxios();
    return useQuery({
        queryKey: [url, filters],
        queryFn: async () =>
            await axiosGET(axiosApi, { url, params: filters, headers, responseType }),
        retry: false,
        enabled: enable,
        refetchOnWindowFocus: false,
    });
}

export const usePOST = ({ url,
    onSuccess = () => { },
    onError = () => { },
    isFile = false,
}: IUsePostProps): UseMutationResult<AxiosResponse<Request>> => {
    let headers = {};
    if (isFile) headers = headersImage;
    const { axiosApi } = useAxios();
    return useMutation({
        mutationFn: async (data) => await axiosPOST(axiosApi, { url, data, headers }),
        onSuccess,
        onError,
    });
}

export function usePUT({
    url,
    isFile = false,
    onSuccess = () => { },
    onError = () => { },
}: IUsePUTProps): UseMutationResult<AxiosResponse> {
    let headers = {}
    if (isFile) headers = headersImage
    const { axiosApi } = useAxios()
    return useMutation({
        mutationFn: (data) => axiosPUT(axiosApi, { url, data, headers }),
        onSuccess,
        onError,
    })
}



export function useDELETE<Request>({
    url,
    onSuccess = () => { },
    onError = () => { },
}: IUseDELETEProps): UseMutationResult<AxiosResponse<Request>> {
    const { axiosApi } = useAxios()
    return useMutation({
        mutationFn: (data) => axiosDELETE(axiosApi, { url }),
        onSuccess,
        onError,
    })
}

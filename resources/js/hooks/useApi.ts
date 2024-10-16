import { AxiosInstance } from 'axios';
import { IAxiosPostProps, IAxiosProps, IUseGetProps, IUsePostProps } from '@/interfaces/IAxiosProps';
import { ApisEnum } from '@/configs/apisEnum';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAxios } from "@hooks/useAxios";

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

export const useGet = <Response>({
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

export const usePost = ({ url,
    onSuccess = () => { },
    onError = () => { },
}: IUsePostProps) => {
    const { axiosApi } = useAxios();
    return useMutation({
        mutationFn: async (data) => await axiosPOST(axiosApi, { url, data }),
        onSuccess,
        onError,
    });
}
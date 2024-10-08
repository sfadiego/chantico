import { AxiosInstance, AxiosResponse } from 'axios';
import { IAxiosPostProps, IAxiosProps, IUseGetProps, IUsePostProps } from '../intefaces/IAxiosProps';
import { ApisEnum } from '../configs/apisEnum';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { axiosApi } from '../configs/axiosConfig';

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
    return response.data
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

// export const useGet = ({ url }: IUseGetProps): UseQueryResult<Response> => {
export const useGet = ({ url, filters = {} }: IUseGetProps) => {
    return useQuery({
        queryKey: [url, filters],
        queryFn: async () => await axiosGET(axiosApi, { url, params: filters })
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
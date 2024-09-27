import axios from 'axios';
import { IAxiosProps, IUseGetProps } from '../intefaces/IAxiosProps';
import { ApisEnum } from '../configs/apisEnum';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const host = ApisEnum.BaseUrl;
const headersImage = { 'content-type': 'multipart/form-data' }
export const axiosGET = async<Params>({ url, params, headers, responseType }: IAxiosProps<Params>) => {
    // return { url, params };
    // const response = axios.get(``, {

    // });
    console.log("axios get");
}

// export const useGet = ({ url }: IUseGetProps): UseQueryResult<Response> => {
export const useGet = ({ url, filters = {} }: IUseGetProps) => {
    return useQuery({
        queryKey: [url, filters],
        queryFn: async () => await axiosGET({ url, params: filters })
    });
}
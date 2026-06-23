import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAxios } from "@/hooks/useAxios";
import { axiosPOST, usePOST } from "@/hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { IAuthResponse, ISignInForm } from "@/intefaces/IAuth";
import { ISingleResponse } from "@/intefaces/ISingleResponse";

const url = ApiRoutes.Auth;

export const useServiceLogin = () => {
    const { axiosApi } = useAxios();
    return useMutation<IAuthResponse, AxiosError, ISignInForm>({
        mutationFn: async (credentials) => {
            const response = await axiosPOST<ISignInForm, never>(axiosApi, {
                url: `${url}/login`,
                data: credentials,
            });
            return (response.data as ISingleResponse<IAuthResponse>).data;
        },
    });
};

export const useServiceRegister = () => usePOST({ url: `${url}/register` });

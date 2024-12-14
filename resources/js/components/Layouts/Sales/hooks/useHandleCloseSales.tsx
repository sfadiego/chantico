
import { useOnSubmit } from "@/hooks/useOnSubmit";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface IuseHandleCloseSaleProps {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    onSuccess: (data: any) => void,
}
export const useHandleCloseSales = ({ mutateAsync, onSuccess }: IuseHandleCloseSaleProps) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => onSuccess(data),
    });

    return {
        onSubmit,
    }
}

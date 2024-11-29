
import { useOnSubmit } from "@/hooks/useOnSubmit";
import { useGetProductInOrder } from "@/services/useOrderService";
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const defaultResponse = {
    isLoading: false,
    showData: false,
    product: null,
}
export const useGetProductDetailInOrder = (currentOrderId: number, productId?: number) => {

    if (!productId) {
        return defaultResponse
    }

    const { isLoading, data } = useGetProductInOrder(currentOrderId, productId)
    return {
        isLoading,
        showData: (!isLoading && data) && true,
        product: data?.data,
    }
}

export const useUpdateCantidad = ({
    mutateAsync,
    onSuccess
}: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error>,
    onSuccess: (data: any) => void,
}) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            toast.success("Actualizado")
            onSuccess(data)
        }
    });

    return { onSubmit };
}

export const useDeleteProduct = ({
    mutateAsync,
    refetch,
    onSuccess
}: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error>,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>,
    onSuccess: (data: any) => void,
}) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            toast.success("Borrado")
            refetch()
            onSuccess(data)
        }
    });

    return { onSubmit };
}
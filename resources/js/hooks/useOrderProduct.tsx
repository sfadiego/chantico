
import { useOnSubmit } from "@/hooks/useOnSubmit";
import { useGetProductInOrder } from "@/services/useOrderService";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
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

export const useUpdateCantidad = ({ mutateAsync }: { mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error> }) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => toast.success("Actualizado")
    });

    return { onSubmit };
}
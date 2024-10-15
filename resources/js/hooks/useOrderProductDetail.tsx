import { useGetProductInOrder } from "@/services/useOrderService";

const defaultResponse = {
    isLoading: false,
    showData: false,
    product: null,
}
const useProductInOrderDetail = (currentOrderId: number, productId?: number) => {
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

export default useProductInOrderDetail;
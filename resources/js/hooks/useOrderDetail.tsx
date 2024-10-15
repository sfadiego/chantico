import { useShowOrder } from "@/services/useOrderService";


const useGetOrderDetail = (currentOrderId: number) => {
    const { isLoading, data } = useShowOrder(currentOrderId)
    return {
        isLoading,
        showData: (!isLoading && data) && true,
        productsInOrder: data?.data?.order_products,
        order: data?.data
    }
}

export default useGetOrderDetail;
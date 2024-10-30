import { useEffect, useState } from "react";
import { useShowOrder } from "@/services/useOrderService";


const useGetOrderDetail = (currentOrderId: number) => {
    const { isLoading, data, refetch } = useShowOrder(currentOrderId)
    return {
        isLoading,
        showData: (!isLoading && data) && true,
        productsInOrder: data?.data?.order_products,
        order: data?.data,
        refetch
    }
}

export default useGetOrderDetail;
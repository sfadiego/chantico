import { useGet } from "../hooks/useApi";

export const useIndexOrder = () => useGet({ url: 'order' })
export const useShowOrder = (orderId: number) => useGet({ url: `order/${orderId}` })
export const useGetProductInOrder = (orderId: number, productId: number) => useGet({ url: `order/${orderId}/product/${productId}` })
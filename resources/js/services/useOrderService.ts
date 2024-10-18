import { useGet, usePost } from "../hooks/useApi";

export const useIndexOrder = () => useGet({ url: 'order' })
export const useShowOrder = (orderId: number) => useGet({ url: `order/${orderId}` })
export const useGetProductInOrder = (orderId: number, productId: number) => useGet({ url: `order/${orderId}/product/${productId}` })

export const useAddProductToOrder = (orderId: number) => usePost({ url: `order/${orderId}/product` })
import { useDELETE, useGet, usePost, usePUT } from "../hooks/useApi";

export const useStoreOrder = () => usePost({ url: 'order' })
export const useIndexOrder = () => useGet({ url: 'order' })
export const useShowOrder = (orderId: number) => useGet({ url: `order/${orderId}` })
export const useGetProductInOrder = (orderId: number, productId: number) => useGet({ url: `order/${orderId}/product/${productId}` })
export const useUpdateOrder = (orderId: number) => usePUT({
    url: `order/${orderId}`,
})

export const useAddProductToOrder = (orderId: number) =>
    usePost({ url: `order/${orderId}/product` })

export const useDeleteOrder = (orderId: number) => useDELETE({url: `order/${orderId}`})
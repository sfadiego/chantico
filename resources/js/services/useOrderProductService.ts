import { useDELETE, usePUT } from "../hooks/useApi"

export const useUpdateOrderProduct = (orderId: number, productId: number) => usePUT({
    url: `order/${orderId}/product/${productId}`,
})

export const useDeleteOrderProduct = (orderId: number, productId: number) => useDELETE({
    url: `order/${orderId}/product/${productId}`,
})

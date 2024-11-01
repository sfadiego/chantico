import { usePUT } from "../hooks/useApi"

export const useUpdateOrderProduct = (orderId: number, productId: number) => usePUT({
    url: `order/${orderId}/product/${productId}`,
})

import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";

export const useStoreOrder = () => usePOST({ url: 'order' })
export const useIndexOrder = () => useGET({ url: 'order' })
export const useShowOrder = (orderId: number) => useGET({ url: `order/${orderId}` })
export const useGetProductInOrder = (orderId: number, productId: number) => useGET({ url: `order/${orderId}/product/${productId}` })
export const useUpdateOrder = (orderId: number) => usePUT({
    url: `order/${orderId}`,
})

export const useAddProductToOrder = (orderId: number) =>
    usePOST({ url: `order/${orderId}/product` })

export const useDeleteOrder = (orderId: number) => useDELETE({ url: `order/${orderId}` })


export const useIndexPrintOrder = (orderId: number) => usePOST({ url: `order/${orderId}/print` })
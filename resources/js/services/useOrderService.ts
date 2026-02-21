import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";

const url = "order";
export const useStoreOrder = () => usePOST({ url });
export const useIndexOrder = () => useGET({ url });
export const useShowOrder = (orderId: number) =>
    useGET({ url: `${url}/${orderId}` });
export const useGetProductInOrder = (orderId: number, productId: number) =>
    useGET({ url: `${url}/${orderId}/product/${productId}` });
export const useUpdateOrder = (orderId: number) =>
    usePUT({
        url: `${url}/${orderId}`,
    });

export const useAddProductToOrder = (orderId: number) =>
    usePOST({ url: `${url}/${orderId}/product` });

export const useDeleteOrder = (orderId: number) =>
    useDELETE({ url: `${url}/${orderId}` });

export const useIndexPrintOrder = (orderId: number) =>
    usePOST({ url: `${url}/${orderId}/print` });

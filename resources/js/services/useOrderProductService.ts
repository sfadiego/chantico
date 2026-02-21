import { useDELETE, usePUT } from "../hooks/useApi";

const url = "order";
export const useUpdateOrderProduct = (orderId: number, productId: number) =>
    usePUT({
        url: `${url}/${orderId}/product/${productId}`,
    });

export const useDeleteOrderProduct = (orderId: number, productId: number) =>
    useDELETE({
        url: `${url}/${orderId}/product/${productId}`,
    });

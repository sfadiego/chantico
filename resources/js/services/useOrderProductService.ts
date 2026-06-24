import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { useDELETE, usePUT } from "../hooks/useApi";

const url = ApiRoutes.Orders;
export const useUpdateOrderProduct = (orderId: number, productId: number) =>
    usePUT({
        url: `${url}/${orderId}/product/${productId}`,
    });

export const useDeleteOrderProduct = (orderId: number, productId: number) =>
    useDELETE({
        url: `${url}/${orderId}/product/${productId}`,
    });

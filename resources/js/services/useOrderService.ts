import { IPaginate } from "@/intefaces/IPaginate";
import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { IOrder } from "@/models/IOrder";
import { IPaginateServiceProps } from "@/intefaces/IPaginateServiceProps";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

const url = ApiRoutes.Orders;
export const useIndexOrder = ({
    filters = [],
    order = "desc",
    page = 1,
    limit = 10,
}: IPaginateServiceProps) =>
    useGET<IPaginate<IOrder>>({
        url,
        filters: { filters, order, page, limit },
    });
export const useStoreOrder = () => usePOST({ url });
export const useShowOrder = (orderId: number) =>
    useGET<IOrder>({ url: `${url}/${orderId}`, enable: !!orderId });
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

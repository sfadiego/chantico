import { IPaginate } from "@/intefaces/IPaginate";
import { axiosGET, useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { IOrder } from "@/models/IOrder";
import { IOrderProduct } from "@/models/IOrderProduct";
import { IPaginateServiceProps } from "@/intefaces/IPaginateServiceProps";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";

const url = ApiRoutes.Orders;
export const useIndexOrder = ({
    filters = [],
    order = "desc",
    page = 1,
    limit = 10,
    sistema_id,
    estatus_pedido_id,
    fecha,
}: IPaginateServiceProps) =>
    useGET<IPaginate<IOrder>>({
        url,
        filters: {
            filters,
            order,
            page,
            limit,
            ...(sistema_id ? { sistema_id } : {}),
            ...(estatus_pedido_id ? { estatus_pedido_id } : {}),
            ...(fecha ? { fecha } : {}),
        },
        enable: sistema_id !== null,
    });

export const useInfiniteIndexOrder = (sistemaId: number | null) => {
    const { axiosApi } = useAxios();
    return useInfiniteQuery<IPaginate<IOrder>>({
        queryKey: ["orders-infinite", { sistemaId }],
        queryFn: async ({ pageParam }) =>
            axiosGET(axiosApi, {
                url,
                params: { page: pageParam, limit: 5, order: "desc", sistema_id: sistemaId },
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.current_page < lastPage.last_page
                ? lastPage.current_page + 1
                : undefined,
        enabled: sistemaId !== null,
    });
};

export const useStoreOrder = () => usePOST({ url });
export const useShowOrder = (orderId: number) =>
    useGET<IOrder>({ url: `${url}/${orderId}`, enable: !!orderId });

export const useIndexOrderProducts = (orderId: number) =>
    useGET<IOrderProduct[]>({ url: `${url}/${orderId}/product`, enable: !!orderId });

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

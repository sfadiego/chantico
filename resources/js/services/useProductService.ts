import { IProduct } from "@/models/IProduct";
import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { IPaginateServiceProps } from "@/intefaces/IPaginateServiceProps";
import { IPaginate } from "@/intefaces/IPaginate";

const url = ApiRoutes.Product;
// export const useIndexProducts = ({
//     productName,
//     categoryId,
// }: {
//     productName?: string;
//     categoryId?: number;
// }) =>
//     useGET<IProduct[]>({
//         url,
//         filters: { search: productName, categoryId },
//     });
export const useIndexProducts = ({
    filters = [],
    order = "desc",
    page = 1,
    limit = 10,
}: IPaginateServiceProps) =>
    useGET<IPaginate<IProduct>>({
        url,
        filters: { filters, order, page, limit },
    });
export const useShowProduct = (id: number) =>
    useGET<IProduct>({ url: `${url}/${id}` });
export const useGetFile = (fileName: string) =>
    useGET({ url: `files/${fileName}` });

// Admin
const adminUrl = "/api/admin/product";
export const useUpdateProductImage = (productId: number) =>
    usePOST({ url: `${adminUrl}/${productId}/image`, isFile: true });
export const useUpdateProduct = (productId: number) =>
    usePUT({ url: `${adminUrl}/${productId}` });
export const useStoreProduct = () => usePOST({ url: adminUrl });
export const useDeleteProduct = (productId: number) =>
    useDELETE({ url: `${adminUrl}/${productId}` });

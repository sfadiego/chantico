import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { IProduct } from "../intefaces/IProduct";

const url = "product";
export const useIndexProducts = ({
    productName,
    categoryId,
}: {
    productName?: string;
    categoryId?: number;
}) =>
    useGET<IProduct[]>({
        url,
        filters: { search: productName, categoryId },
    });
export const useShowProduct = (id: number) =>
    useGET<IProduct>({ url: `${url}/${id}` });
export const useGetFile = (fileName: string) =>
    useGET({ url: `files/${fileName}` });

// Admin
const adminUrl = "admin/product";
export const useUpdateProductImage = (productId: number) =>
    usePOST({ url: `${adminUrl}/${productId}/image`, isFile: true });
export const useUpdateProduct = (productId: number) =>
    usePUT({ url: `${adminUrl}/${productId}` });
export const useStoreProduct = () => usePOST({ url: adminUrl });
export const useDeleteProduct = (productId: number) =>
    useDELETE({ url: `${adminUrl}/${productId}` });

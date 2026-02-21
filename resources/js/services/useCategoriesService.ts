import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { ICategory } from "../intefaces/ICategory";
import { IProduct } from "../intefaces/IProduct";

const url = "category";
export const useIndexCategories = (search = "") =>
    useGET<ICategory[]>({ url: `${url}?search=${search}` });
export const useShowCategory = (id: number) =>
    useGET<ICategory>({ url: `${url}/${id}` });
export const useProductByCategory = (categoryId: number, enable: boolean) =>
    useGET<IProduct>({
        url: `${url}/${categoryId}/product`,
        enable,
    });

//Admin routes
const adminUrl = "admin/category";
export const useStoreCategory = () => usePOST({ url: adminUrl });
export const useUpdateCategory = (categoryId: number) =>
    usePUT({ url: `${adminUrl}/${categoryId}` });
export const useDeleteCategory = (categoryId: number) =>
    useDELETE({ url: `${adminUrl}/${categoryId}` });

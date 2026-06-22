import { IProduct } from "@/models/IProduct";
import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { ICategory } from "../models/ICategory";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

const url = ApiRoutes.Category;
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

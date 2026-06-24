import { IProduct } from "@/models/IProduct";
import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi";
import { ICategory } from "../models/ICategory";
import { IPaginate } from "@/intefaces/IPaginate";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

const url = ApiRoutes.Category;

// Full list — used for dropdowns and filters.
// The backend always returns paginated; request a large limit to get all records.
export const useIndexCategories = (search = "") => {
    const query = useGET<IPaginate<ICategory>>({
        url,
        nameQuery: `${url}/all`,
        filters: { limit: 1000, page: 1, ...(search ? { search } : {}) },
    });
    return { ...query, data: query.data?.data ?? [] };
};

// Paginated — used for the categories DataTable
export const useIndexCategoriesPaginated = ({
    page = 1,
    limit = 10,
    search = "",
}: { page?: number; limit?: number; search?: string } = {}) =>
    useGET<IPaginate<ICategory>>({
        url,
        nameQuery: url,
        filters: { page, limit, ...(search ? { search } : {}) },
    });

export const useShowCategory = (id: number) =>
    useGET<ICategory>({ url: `${url}/${id}` });

export const useProductByCategory = (categoryId: number, enable: boolean) =>
    useGET<IProduct>({
        url: `${url}/${categoryId}/product`,
        enable,
    });

// Admin routes
const adminUrl = ApiRoutes.Category; // POST/PUT/DELETE go to /api/category and /api/category/{id}
export const useStoreCategory = () => usePOST({ url: adminUrl });
export const useUpdateCategory = (categoryId: number) =>
    usePUT({ url: `${adminUrl}/${categoryId}` });
export const useDeleteCategory = (categoryId: number) =>
    useDELETE({ url: `${adminUrl}/${categoryId}` });

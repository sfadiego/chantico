import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi"
import { ICategory } from "../intefaces/ICategory"
import { IProduct } from "../intefaces/IProduct"

export const useIndexCategories = (search = '') => useGET<ICategory[]>({ url: `category?search=${search}` })
export const useShowCategory = (id: number) => useGET<ICategory>({ url: `category/${id}` })
export const useProductByCategory = (categoryId: number, enable: boolean) => useGET<IProduct>({
    url: `category/${categoryId}/product`,
    enable
})

//Admin routes
export const useStoreCategory = () => usePOST({ url: 'admin/category' })
export const useUpdateCategory = (categoryId: number) => usePUT({ url: `admin/category/${categoryId}` })
export const useDeleteCategory = (categoryId: number) => useDELETE({ url: `admin/category/${categoryId}` })

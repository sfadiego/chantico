import { useDELETE, useGet, usePost, usePUT } from "../hooks/useApi"
import { ICategory } from "../intefaces/ICategory"
import { IProduct } from "../intefaces/IProduct"

export const useIndexCategories = () => useGet<ICategory[]>({ url: 'category' })
export const useShowCategory = (id: number) => useGet<ICategory>({ url: `category/${id}` })
export const useProductByCategory = (categoryId: number, enable: boolean) => useGet<IProduct>({
    url: `category/${categoryId}/product`,
    enable
})

//Admin routes
export const useStoreCategory = () => usePost({ url: 'admin/category' })
export const useUpdateCategory = (categoryId: number) => usePUT({ url: `admin/category/${categoryId}` })
export const useDeleteCategory = (categoryId: number) => useDELETE({ url: `admin/category/${categoryId}` })

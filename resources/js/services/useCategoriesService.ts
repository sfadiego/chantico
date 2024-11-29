import { useGet } from "../hooks/useApi"
import { ICategory } from "../intefaces/ICategory"
import { IProduct } from "../intefaces/IProduct"

export const useIndexCategories = () => useGet<ICategory[]>({ url: 'categories' })
export const useShowCategory = (id: number) => useGet<ICategory>({ url: `categories/${id}` })
export const useUpdateCategory = () => { }
export const useDeleteCategory = () => { }

export const useProductByCategory = (categoryId: number, enable: boolean) => useGet<IProduct>({
    url: `categories/${categoryId}/product`,
    enable
})
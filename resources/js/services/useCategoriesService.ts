import { useGet } from "../hooks/useApi"
import { ICategory } from "../intefaces/ICategory"

export const useIndexCategories = () => useGet<ICategory[]>({ url: 'categories' })
export const useShowCategory = (id: number) => useGet<ICategory>({ url: `categories/${id}` })
export const useUpdateCategory = () => { }
export const useDeleteCategory = () => { }
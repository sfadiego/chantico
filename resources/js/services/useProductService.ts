import { useGet } from "../hooks/useApi"
import { IProduct } from "../intefaces/IProduct"

export const useIndexProducts = (search: string) => useGet<IProduct[]>({ url: 'product', filters: { search: search } })
export const useShowProduct = (id: number) => useGet<IProduct>({ url: `product/${id}` })
export const useUpdateProduct = () => { }
export const useDeleteProduct = () => { }
import { useGet } from "../hooks/useApi"
import { IProduct } from "../intefaces/IProduct"

export const useIndexProducts = () => useGet<IProduct[]>({ url: 'product', })
export const useShowProduct = (id: number) => useGet<IProduct>({ url: `product/${id}` })
export const useUpdateProduct = () => { }
export const useDeleteProduct = () => { }
import { useGet } from "../hooks/useApi"
import { IProduct } from "../intefaces/IProduct"

export const useIndexProducts = ({ productName, categoryId }: { productName: string, categoryId: number }) =>
    useGet<IProduct[]>({ url: 'product', filters: { search: productName, categoryId } })
export const useShowProduct = (id: number) => useGet<IProduct>({ url: `product/${id}` })
export const useUpdateProduct = () => { }
export const useDeleteProduct = () => { }
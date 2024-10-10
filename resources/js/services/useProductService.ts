import { useGet } from "../hooks/useApi"

export const useIndexProducts = () => useGet({ url: 'product' })
export const useShowProduct = (id: number) => useGet({ url: `product/${id}` })
export const useUpdateProduct = () => { }
export const useDeleteProduct = () => { }
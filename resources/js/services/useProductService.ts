import { useDELETE, useGET, usePOST, usePUT } from "../hooks/useApi"
import { IProduct } from "../intefaces/IProduct"

export const useIndexProducts = ({ productName, categoryId }: { productName?: string, categoryId?: number }) =>
    useGET<IProduct[]>({ url: 'product', filters: { search: productName, categoryId } })
export const useShowProduct = (id: number) => useGET<IProduct>({ url: `product/${id}` })
export const useGetFile = (fileName: string) => useGET({ url: `files/${fileName}` })

// Admin
export const useUpdateProductImage = (productId: number) => usePOST({ url: `admin/product/${productId}/image`, isFile: true })
export const useUpdateProduct = (productId: number) => usePUT({ url: `admin/product/${productId}` })
export const useStoreProduct = () => usePOST({ url: `admin/product` })
export const useDeleteProduct = (productId: number) => useDELETE({ url: `admin/product/${productId}` })
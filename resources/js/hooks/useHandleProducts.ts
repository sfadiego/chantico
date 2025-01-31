import { useIndexProducts } from "../services/useProductService";

interface IUseHandleProductsProps {
    categoryId?: number,
    productName: string
}

const useHandleProducts = ({ categoryId, productName }: IUseHandleProductsProps) => {
    let { isLoading, refetch, data } = useIndexProducts({ productName, categoryId });
    return {
        showData: (!isLoading && data) && true,
        products: data?.data,
        isLoading,
        refetch
    }

}

export default useHandleProducts;
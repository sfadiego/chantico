import { useIndexProducts } from "../services/useProductService";

interface IUseHandleProductsProps {
    categoryId: number,
    productName: string
}

const useHandleProducts = ({ categoryId, productName }: IUseHandleProductsProps) => {
    let { isLoading, data } = useIndexProducts({ productName, categoryId });
    return {
        showData: (!isLoading && data) && true,
        products: data?.data,
        isLoading
    }

}

export default useHandleProducts;
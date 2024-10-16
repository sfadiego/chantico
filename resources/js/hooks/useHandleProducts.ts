import { useProductByCategory } from "../services/useCategoriesService";
import { useIndexProducts } from "../services/useProductService";

interface IUseHandleProductsProps {
    categoryId: number,
    searchProduct: string
}

const useHandleProducts = ({ categoryId, searchProduct = '' }: IUseHandleProductsProps) => {
    let { isLoading, data } = categoryId == 0 ? useIndexProducts(searchProduct) : useProductByCategory(categoryId, true);

    return {
        showData: (!isLoading && data) && true,
        products: data?.data,
        isLoading
    }
}


export default useHandleProducts;
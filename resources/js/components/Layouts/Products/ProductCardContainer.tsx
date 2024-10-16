import { IProduct, IProductContainerProps } from '@/intefaces/IProduct'
import { useProductByCategory } from '@/services/useCategoriesService';
import { useIndexProducts } from '@/services/useProductService';
import { ProductCard } from './ProductCard';
import { Alert } from 'react-bootstrap';
import LoadingComponent from '../LoadingComponent';

const useHandleProducts = ({ categoryId, searchProduct = '' }: IProductContainerProps) => {
    let { isLoading, data } = categoryId == 0 ? useIndexProducts(searchProduct) : useProductByCategory(categoryId, true);

    return {
        showData: (!isLoading && data) && true,
        products: data?.data,
        isLoading
    }
}

export const ProductCardContainer = ({ categoryId, searchProduct }: IProductContainerProps) => {
    const { showData, isLoading, products } = useHandleProducts({ categoryId, searchProduct });
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            {
                showData && products.map(({ nombre, precio, picture }: IProduct, key: number) =>
                    <ProductCard
                        key={key}
                        name={nombre}
                        price={precio}
                        picture={picture}
                    />
                )
            }
            {
                !products.length && (
                    <div className='col-md-12'>
                        <Alert variant={`warning`}>
                            Sin productos
                        </Alert>
                    </div>
                )
            }
        </>
    )
}

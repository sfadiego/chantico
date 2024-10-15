import { IProduct } from '@/intefaces/IProduct'
import { useProductByCategory } from '@/services/useCategoriesService';
import { useIndexProducts } from '@/services/useProductService';
import { ProductCard } from './ProductCard';
import { Alert } from 'react-bootstrap';
import LoadingComponent from '../LoadingComponent';


const useHandleProducts = (categoryId: number) => {
    let { isLoading, data } = categoryId == 0 ? useIndexProducts() : useProductByCategory(categoryId, true);

    return {
        showData: (!isLoading && data) && true,
        products: data?.data,
        isLoading
    }
}

export const ProductCardContainer = ({ categoryId }: { categoryId: number }) => {
    const { showData, isLoading, products } = useHandleProducts(categoryId);
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            {
                showData && products.map(({ nombre, precio, picture, foto_id }: IProduct, key: number) =>
                    <ProductCard
                        key={key}
                        name={nombre}
                        price={precio}
                        image={foto_id ? picture : null}
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

import { Row } from 'react-bootstrap'
import { useIndexProducts } from '@/services/useProductService';
import { useTakeOrder } from '@/hooks/useTakeOrder';
import { useProductByCategory } from '@/services/useCategoriesService';
import { ProductCard } from './ProductCard'
import { IProduct } from '@resources/interfaces/IProduct';
import LoadingComponent from '../LoadingComponent';

const useHandleProducts = (categoryId: number) => {
    let { isLoading, data } = categoryId == 0 ? useIndexProducts() : useProductByCategory(categoryId, false);
    console.log(categoryId,isLoading, data);
    return {
        showData: (!isLoading && data),
        products: data?.data,
        isLoading
    }
}

export const ProductsContainer = () => {
    const { categoryId } = useTakeOrder();
    const { showData, isLoading, products } = useHandleProducts(categoryId!!);
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <Row className='mt-1'>
            <div className="col-12">
                <h3>Productos</h3>
            </div>
            {
                showData && products.map(({ nombre, precio, picture, foto_id }: IProduct, key: number) => <ProductCard
                    key={key}
                    name={nombre}
                    price={precio}
                    image={foto_id ? picture : null}
                />
                )
            }
        </Row>
    )
}

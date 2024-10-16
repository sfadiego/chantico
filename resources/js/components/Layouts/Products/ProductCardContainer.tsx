import { IProduct, IProductContainerProps } from '@/intefaces/IProduct'
import { ProductCard } from './ProductCard';
import { Alert } from 'react-bootstrap';
import LoadingComponent from '../LoadingComponent';
import useHandleProducts from '@/hooks/useHAndleProducts';

export const ProductCardContainer = ({ categoryId, searchProduct = '', currentOrderId }: IProductContainerProps) => {
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

import { Row } from 'react-bootstrap'
import { ProductCardContainer } from './ProductCardContainer';
import { IProductContainerProps } from '@/intefaces/IProduct';

export const ProductsContainer = ({ categoryId, searchProduct }: IProductContainerProps) => {
    return (
        <Row className='mt-1'>
            <div className="col-12">
                <h3>Productos</h3>
            </div>
            <ProductCardContainer
                searchProduct={searchProduct}
                categoryId={categoryId} />
        </Row>
    )
}

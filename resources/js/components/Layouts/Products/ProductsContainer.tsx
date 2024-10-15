import { Row } from 'react-bootstrap'
import { ProductCardContainer } from './ProductCardContainer';

export const ProductsContainer = ({ categoryId }: { categoryId: number }) => {
    return (
        <Row className='mt-1'>
            <div className="col-12">
                <h3>Productos</h3>
            </div>
            <ProductCardContainer categoryId={categoryId} />
        </Row>
    )
}

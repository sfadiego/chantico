import useProductInOrderDetail from '@/hooks/useOrderProductDetail';
import ButtonComponent from '../../Button/ButtonComponent';
import LoadingComponent from '../LoadingComponent';

interface ItemDetailProps {
    show?: boolean,
    orderId: number,
    currentProductId: number
}
const Detail = ({ orderId, currentProductId }: ItemDetailProps) => {
    const { isLoading, showData, product } = useProductInOrderDetail(orderId, currentProductId);
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    const { cantidad } = [...product].shift();

    return <>
        <hr className="mt-1 mb-1" />
        <div className={`d-flex`}>
            <div className="p-2 flex-fill">
                <span className='text-secondary'>{cantidad} pza</span>
            </div>
            <div className="p-2">
                <ButtonComponent className='btn btn-info btn-sm'>-</ButtonComponent>
                <ButtonComponent className='btn btn-info btn-sm border-start'>+</ButtonComponent>
                <ButtonComponent className='btn btn-danger btn-sm border-start'>
                    <i className="bi bi-trash3"></i>
                </ButtonComponent>
            </div>
        </div>
    </>
}
const ItemDetail = ({ show = false, orderId, currentProductId }: ItemDetailProps) => {
    return (
        <>
            {
                (show && orderId && currentProductId) ? <Detail
                    orderId={orderId}
                    currentProductId={currentProductId} />
                    : null
            }
        </>
    )
}

export default ItemDetail;
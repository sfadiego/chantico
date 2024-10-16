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
    const { cantidad, precio, product: { nombre } } = [...product].shift();
    const total = precio * cantidad;
    return <>
        <hr className="mt-1 mb-2" />
        <div className='d-flex'>
            <div className=' flex-grow-1'>
                <div className='pt-1'>
                    <span className='text-danger'>${total}</span> {nombre} 
                </div>
            </div>
            <div className=''>
                <ButtonComponent className='btn flex-fill btn-info btn-sm'>-</ButtonComponent>
                <span className='text-secondary ps-2 pe-2'>{cantidad}</span>
                <ButtonComponent className='btn flex-fill btn-info btn-sm border-start'>+</ButtonComponent>
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
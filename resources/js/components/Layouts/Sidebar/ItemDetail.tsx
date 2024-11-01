import { useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';
import { Button } from 'react-bootstrap';
import { useGetProductDetailInOrder, useUpdateCantidad } from '@/hooks/useOrderProduct';
import { useUpdateOrderProduct } from '@/services/useOrderProductService';
import { toast } from 'react-toastify';

interface ItemDetailProps {
    show: boolean;
    orderId: number;
    currentProductId: number;
}

const ItemDetail = ({ orderId, currentProductId, show = false }: ItemDetailProps) => {
    if (!show || !orderId || !currentProductId) return null;
    const { isLoading, product } = useGetProductDetailInOrder(orderId, currentProductId);
    const mutate = useUpdateOrderProduct(orderId, currentProductId);
    const [cantidad, setCantidad] = useState<number>(0);
    useEffect(() => {
        if (product) {
            const { cantidad } = [...product].shift();
            setCantidad(cantidad);
        }
    }, [product]);

    if (isLoading || !product) return <LoadingComponent />;

    const { precio, product: { id, nombre } } = [...product].shift();
    const total = precio * cantidad;
    const handleDecrement = () => {
        let nuevaCantidad = Math.max(cantidad - 1, 0);
        setCantidad(prev => nuevaCantidad);
        const { onSubmit } = useUpdateCantidad({ mutateAsync: mutate.mutateAsync });
        onSubmit({ cantidad: nuevaCantidad }, {
            setErrors: (errors: any) => {
                toast.error("error al actualizar");
                console.log(errors);
            }
        });
    };

    const handleIncrement = () => {
        let nuevaCantidad = cantidad + 1;
        setCantidad(prev => nuevaCantidad);
        const { onSubmit } = useUpdateCantidad({ mutateAsync: mutate.mutateAsync });
        onSubmit({ cantidad: nuevaCantidad }, {
            setErrors: (errors: any) => {
                toast.error("error al actualizar");
                console.log(errors);
            }
        });
    };

    return (
        <>
            <hr className="mt-1 mb-2" />
            <div className='d-flex'>
                <div className='flex-grow-1'>
                    <div className='pt-1'>
                        <span className='text-danger'>${total}</span> {nombre}
                    </div>
                </div>
                <div className=''>
                    <Button className='btn flex-fill btn-info btn-sm' onClick={handleDecrement}>-</Button>
                    <span className='text-secondary ps-2 pe-2'>{cantidad}</span>
                    <Button
                        onClick={handleIncrement}
                        className='btn flex-fill btn-info btn-sm border-start'>
                        +
                    </Button>
                </div>
            </div>
        </>
    );
}


export default ItemDetail;

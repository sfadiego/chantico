import { useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';
import { Button } from 'react-bootstrap';
import { useDeleteProduct, useGetProductDetailInOrder, useUpdateCantidad } from '@/hooks/useOrderProduct';
import { useDeleteOrderProduct, useUpdateOrderProduct } from '@/services/useOrderProductService';
import { toast } from 'react-toastify';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface ItemDetailProps {
    show: boolean;
    orderId: number;
    currentProductId: number;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

const ItemDetail = ({ orderId, currentProductId, show = false, refetch }: ItemDetailProps) => {
    const [state, setState] = useState({ order: orderId, productId: currentProductId, isShow: show });
    let { order, productId, isShow } = state;
    const { isLoading, product } = useGetProductDetailInOrder(order, productId);
    const mutate = useUpdateOrderProduct(order, currentProductId);
    const mutateDelete = useDeleteOrderProduct(order, currentProductId);
    const [cantidad, setCantidad] = useState<number>(0);

    useEffect(() => {
        if (product) {
            const { cantidad } = [...product].shift();
            setCantidad(cantidad);
        }

        setState({
            ...state,
            isShow, productId: currentProductId
        });
    }, [product, currentProductId, isShow]);
    if (!isShow || !order || !productId) return null;
    if (isLoading || !product) return <LoadingComponent />;
    const { precio, product: { id, nombre } } = [...product].shift();
    const total = precio * cantidad;

    const handleDelete = () => {
        const { onSubmit } = useDeleteProduct({
            mutateAsync: mutateDelete.mutateAsync,
            refetch,
            onSuccess: (data) => setState({ ...state, isShow: false })
        });

        onSubmit({}, {
            setErrors: (errors: any) => {
                toast.error("error al actualizar");
                console.log(errors);
            }
        });
    }

    const handleDecrement = () => {
        let nuevaCantidad = Math.max(cantidad - 1, 1);
        setCantidad(prev => nuevaCantidad);
        const { onSubmit } = useUpdateCantidad({
            mutateAsync: mutate.mutateAsync,
            onSuccess: (data) => { refetch() }
        });

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
        const { onSubmit } = useUpdateCantidad({
            mutateAsync: mutate.mutateAsync,
            onSuccess: (data) => { refetch() }

        });
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
                    <Button onClick={handleDelete} className='btn flex-fill btn-danger btn-sm me-1'>
                        <i className="bi bi-trash"></i>
                    </Button>
                    <Button className='btn flex-fill btn-info btn-sm'
                        onClick={handleDecrement}>
                        -
                    </Button>
                    <span className='text-secondary ps-2 pe-2'>
                        {cantidad}
                    </span>
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
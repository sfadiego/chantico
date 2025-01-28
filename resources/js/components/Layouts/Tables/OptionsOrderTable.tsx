import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useDeleteOrder } from '@/services/useOrderService';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
interface OptionsOrderTableProps {
    orderId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
    callbackSelected: (orderId: number, total: number) => void,
    total: number
}

export const OptionsOrderTable = ({ orderId, refetch, total, callbackSelected }: OptionsOrderTableProps) => {
    const mutate = useDeleteOrder(orderId);
    const deleteOrder = ({ mutateAsync }) => {
        const { onSubmit } = useOnSubmit({
            mutateAsync,
            onSuccess: (data) => {
                toast.success("Orden borrada");
                refetch()
            }
        });

        return { onSubmit };
    }

    const handleCallback = () => callbackSelected(orderId, total);
    const handleDelete = () => {
        const { onSubmit } = deleteOrder({ mutateAsync: mutate.mutateAsync });
        onSubmit({}, {
            setErrors: (errors: any) => {
                console.log(errors.message);
                errors.message && toast.error(errors.message);
            }
        });
    }

    return (
        <>
            <Button onClick={() => handleDelete()} variant='danger' className='ms-2'> <i className="bi bi-trash"></i> </Button>
            <Button variant='warning' className='ms-2'><i className="bi bi-printer"></i></Button>
            <Button onClick={() => handleCallback()} variant='info' className='ms-2'><i className="bi bi-currency-dollar"></i></Button>
            <a className='btn btn-info ms-2 rounded-0' href={`/take-order/${orderId}`}>
                <i className="bi bi-arrow-right"></i>
            </a>
        </>
    )
}

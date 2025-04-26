import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useDeleteOrder, useIndexPrintOrder } from '@/services/useOrderService';
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
interface OptionsOrderTableProps {
    orderId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
    callbackSelected: (orderId: number, total: number) => void,
    total: number
}

//TODO: MOVER A HOOK
const usePrintOrder = (
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>
) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => { return; }
    });

    onSubmit({}, {
        setErrors: (errors: any) => toast.error(errors.message)
    });
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
        Swal.fire({
            icon: "warning",
            title: "Estas por borrar esta orden",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`
        }).then(({ isConfirmed }) => isConfirmed && confirmDelete());
    }
    const confirmDelete = () => {
        const { onSubmit } = deleteOrder({ mutateAsync: mutate.mutateAsync });
        onSubmit({}, {
            setErrors: (errors: any) => {
                errors.message && toast.error(errors.message);
            }
        });
    }

    const mutatePrint = useIndexPrintOrder(orderId);
    const handlePrint = () => usePrintOrder(mutatePrint.mutateAsync);
    return (
        <>
            <Button onClick={() => handleDelete()} variant='danger' className='ms-2'> <i className="bi bi-trash"></i> </Button>
            <Button variant='warning' onClick={handlePrint} className='ms-2'>
                <i className="bi bi-printer"></i>
            </Button>
            <Button disabled={total == 0 ? true : false} onClick={() => handleCallback()} variant='info' className='ms-2'>
                <i className="bi bi-currency-dollar"></i>
            </Button>
            <a className='btn btn-info ms-2 rounded-0' href={`/take-order/${orderId}`}>
                <i className="bi bi-arrow-right"></i>
            </a>
        </>
    )
}

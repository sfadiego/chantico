import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useDeleteProduct } from '@/services/useProductService';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
interface OptionsOrderTableProps {
    categoryId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const OptionsCategoryTable = ({ categoryId, refetch }: OptionsOrderTableProps) => {
    const mutate = useDeleteProduct(categoryId);
    const deleteProduct = ({ mutateAsync }) => {
        const { onSubmit } = useOnSubmit({
            mutateAsync,
            onSuccess: (data) => {
                toast.success("Producto borrado");
                refetch()
            }
        });

        return { onSubmit };
    }

    const handleDelete = () => {
        const { onSubmit } = deleteProduct({ mutateAsync: mutate.mutateAsync });
        onSubmit({}, {
            setErrors: (errors: any) => {
                console.log(errors.message);
                toast.error(errors.message);
            }
        });
    }

    return (
        <>
            <Button onClick={() => handleDelete()} variant='danger' className='ms-2'>
                <i className="bi bi-trash"></i>
            </Button>
            <a className='btn btn-info ms-2 rounded-0' href={`/admin/product/${categoryId}`}>
                <i className="bi bi-pencil-square"></i>
            </a>
        </>
    )
}

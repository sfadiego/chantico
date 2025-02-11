import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useDeleteCategory } from '@/services/useCategoriesService';
import { useDeleteProduct } from '@/services/useProductService';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
interface OptionsOrderTableProps {
    categoryId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const OptionsCategoryTable = ({ categoryId, refetch }: OptionsOrderTableProps) => {
    const mutate = useDeleteCategory(categoryId);
    const deleteCategory = ({ mutateAsync }) => {
        const { onSubmit } = useOnSubmit({
            mutateAsync,
            onSuccess: (data) => {
                toast.success("Categoria borrada");
                refetch()
            }
        });

        return { onSubmit };
    }

    const handleDelete = () => {
        Swal.fire({
            icon: "warning",
            title: "Estas por borrar esta categoria",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`
        }).then(({ isConfirmed }) => isConfirmed && confirmDelete());
    }
    const confirmDelete = () => {
        const { onSubmit } = deleteCategory({ mutateAsync: mutate.mutateAsync });
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
            <a className='btn btn-info ms-2 rounded-0' href={`/admin/category/${categoryId}`}>
                <i className="bi bi-pencil-square"></i>
            </a>
        </>
    )
}

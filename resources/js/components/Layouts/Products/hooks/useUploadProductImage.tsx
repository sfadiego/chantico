import { useOnSubmit } from "@/hooks/useOnSubmit";
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const useUploadProductImage = ({ mutateAsync, closeModal, refetch }: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}) => {
    const MAX_SIZE = 5000000; // 5MB
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            toast.success(`La imagen se cargo correctamente`);
            closeModal(false);
            refetch
        },
    });

    const validationSchema = Yup.object({
        file: Yup.mixed()
            .required('Este campo es obligatorio')
            .test('fileSize', 'El archivo es demasiado grande',
                (value) => value && (value as File).size <= MAX_SIZE)
    });

    const initialValues = {
        file: undefined,
    };

    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

export default useUploadProductImage;
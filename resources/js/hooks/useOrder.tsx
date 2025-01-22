import { useOnSubmit } from "@/hooks/useOnSubmit";
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import * as Yup from 'yup';

interface IuseOrderProps {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    closeModal?: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const useOrder = ({ mutateAsync, refetch, closeModal }: IuseOrderProps) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            console.log(data);
            refetch()
            closeModal && closeModal(false)
        },
    });
    const validationSchema = Yup.object({
        descuento: Yup.number().min(0, 'El porcentaje no es valido').required('Este campo es obligatorio'),
    });

    const initialValues = {
        descuento: 10
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}
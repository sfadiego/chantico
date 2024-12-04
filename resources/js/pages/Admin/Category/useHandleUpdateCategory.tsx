import * as Yup from 'yup';
import { useOnSubmit } from "@/hooks/useOnSubmit";
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useHandleUpdateCategory = ({
    mutateAsync
}: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error>
}) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            console.log("actualizado", data);
        },
    });

    const validationSchema = Yup.object({
        nombre: Yup.string().required('Este campo es obligatorio'),
        orden: Yup.number()
    });

    const initialValues = {
        nombre: '',
        orden: 1,
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }

}
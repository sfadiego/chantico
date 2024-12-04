import { useOnSubmit } from "@/hooks/useOnSubmit";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import * as Yup from 'yup';

interface IuseCategoryProps {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    onSuccess: (data: any) => void,
}
export const useCategory = ({ mutateAsync, onSuccess }: IuseCategoryProps) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => onSuccess(data),
    });
    const validationSchema = Yup.object({
        nombre: Yup.string().required('Este campo es obligatorio'),
        orden: Yup.number(),
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

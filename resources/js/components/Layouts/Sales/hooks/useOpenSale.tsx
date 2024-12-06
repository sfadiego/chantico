import { useOnSubmit } from "@/hooks/useOnSubmit";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import * as Yup from 'yup';

interface IuseOpenSaleProps {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    onSuccess: (data: any) => void,
    onError: (data: any) => void,
}
export const useOpenSales = ({ mutateAsync, onSuccess, onError }: IuseOpenSaleProps) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => onSuccess(data),
        onError: (data) => onError(data),

    });
    const validationSchema = Yup.object({
        efectivo_caja_inicio: Yup.number().min(1, 'La cantidad no es valida').required('Este campo es obligatorio'),
        user_id: Yup.number().required('La categoria es requerida'),
        observaciones: Yup.string(),
    });

    const initialValues = {
        efectivo_caja_inicio: 1,
        user_id: 0,
        observaciones: '',
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

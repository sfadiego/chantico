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
        precio: Yup.number().min(1, 'El precio no es valido').required('Este campo es obligatorio'),
        categoria_id: Yup.number().required('La categoria es requerida'),
        descripcion: Yup.string(),
    });

    const initialValues = {
        nombre: '',
        precio: 0,
        categoria_id: "",
        descripcion: "",
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

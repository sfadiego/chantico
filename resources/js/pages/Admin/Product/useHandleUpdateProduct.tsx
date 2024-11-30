import * as Yup from 'yup';
import { useOnSubmit } from "@/hooks/useOnSubmit";

export const useHandleUpdateProduct = ({
    mutateAsync
}) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            console.log("guardado", data);
        },
    });

    const validationSchema = Yup.object({
        nombre: Yup.string().required('Este campo es obligatorio'),
        precio: Yup.number().min(1, 'El precio no es valido').required('Este campo es obligatorio'),
        categoria_id: Yup.number().required('La categoria es requerida'),
        descripcion: Yup.string().required('La descripcion es requerida'),
    });

    const initialValues = {
        nombre: '',
        precio: 0,
        categoria_id: "",
        descripcion: ""
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}
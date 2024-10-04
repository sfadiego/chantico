//regresa los props para Formik
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useAxios } from '../../../hooks/useAxios'
import * as Yup from 'yup';
export const useLogin = ({
    mutateAsync
}) => {
    const { saveAuth } = useAxios();
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: ({ data: { access_token, user } }) => {
            console.log(access_token, user);
            saveAuth(acces_token, user);
        }
    });

    const validationSchema = Yup.object({
        email: Yup.string().required('Requerido').email('Email inválido'),
        password: Yup.string().required('Requerido'),
    });

    const initialValues = {
        email: '',
        password: ''
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}
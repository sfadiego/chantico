//regresa los props para Formik
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useAxios } from '../../../hooks/useAxios'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { RoleEnum } from '@/enums/RoleEnum';
import { RoutesAdmin } from '@/router/modules/admin.routes';
export const useLogin = ({
    mutateAsync
}) => {
    const { saveAuth } = useAxios();
    const navigate = useNavigate();
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: ({ data: { access_token, user } }) => {
            saveAuth(access_token, user);
            let { rol_id, activo } = user;
            if (rol_id == RoleEnum.Admin && activo) {
                navigate(RoutesAdmin.Dashboard);
                return;
            }
        },
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
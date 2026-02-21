import { useOnSubmit } from "@/hooks/useOnSubmit";
import { useAxios } from "../../hooks/useAxios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "@/router/modules/admin.routes";
import { IAuthResponse, ISignInForm } from "@/intefaces/IAuth";
import { useServiceLogin } from "@/services/auth/useServiceAuth";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { saveAuth } = useAxios();
    const initialValues: ISignInForm = {
        email: "",
        password: "",
    };

    const handleSuccess = (data: IAuthResponse) => {
        const { user, access_token } = data;
        saveAuth(access_token, user);
        navigate(AdminRoutes.Dashboard);
    };
    const mutator = useServiceLogin();
    const { onSubmit } = useOnSubmit<ISignInForm>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const validationSchema = Yup.object({
        email: Yup.string().required("El correo electrónico es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    });

    return {
        initialValues,
        validationSchema,
        onSubmit,
    };
};

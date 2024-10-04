import { toast } from 'react-toastify';
//valida la respuesta de la api con mutateAsync: tanstack
export const useOnSubmit = <Request = any, Response = any>({
    mutateAsync,
    onSuccess,
    onError,
}) => {

    const onSubmit = async (data: Request, { setErrors }: any) => {
        try {
            const res = await mutateAsync(data)
            onSuccess(res.data)
        } catch (error: any) {
            if (error.response?.data?.data != null) {
                setErrors(error.response.data.data)
            } else if (onError) {
                onError(error);
            } else {
                toast(error.response?.data.message);
            }
        }
    }

    return {
        onSubmit,
    }
}
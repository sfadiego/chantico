//valida la respuesta de la api con mutateAsync: tanstack
import { UseMutateAsyncFunction } from '@tanstack/react-query/build/modern'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export const useOnSubmit = <Request = any, Response = any>({
    mutateAsync,
    onSuccess,
    onError,
}: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    onSuccess: (data: Response) => void,
    onError?: (data: Error) => void
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
                console.log(error.response);
                toast.error(error.response?.data.message);
            }
        }
    }

    return {
        onSubmit,
    }
}
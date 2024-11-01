import React from 'react'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface IOrderProductProps {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error>,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}
export const useAddOrderProduct = ({ mutateAsync, refetch }: IOrderProductProps) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            toast.success("Producto agregado");
            refetch()
        }
    });
    return { onSubmit }
}
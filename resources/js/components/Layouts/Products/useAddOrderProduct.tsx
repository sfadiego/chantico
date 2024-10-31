import React from 'react'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IOrderProduct } from '@/intefaces/IOrderProduct';
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface IOrderProductProps {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error>,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}
export const useAddOrderProduct = ({ mutateAsync, refetch }: IOrderProductProps) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            console.log("useAddOrderProduct - onSuccess", data);
            refetch()
        }
    });
    return { onSubmit }
}
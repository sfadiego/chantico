import React from 'react'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IOrderProduct } from '@/intefaces/IOrderProduct';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface IOrderProductProps {
    // mutateAsync: UseMutateAsyncFunction,
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error>
    // data: IOrderProduct,
    // onError: () => <Promise>
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
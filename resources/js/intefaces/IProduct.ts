import { ThrowOnError, UseQueryResult } from "@tanstack/react-query"
import { IFileProps } from "./IFileProps"

export interface IProduct {
    id: number
    nombre: string,
    precio: number,
    descripcion: string,
    foto_id: number | null,
    picture: IFileProps,
    categoria_id: number,
    activo: boolean,
};


export interface IProductContainerProps {
    productName?: string,
    categoryId: number,
    currentOrderId: number,
    refetch: () => UseQueryResult
}

export interface IProductProps {
    nombre: string,
    precio: number,
    picture: IFileProps,
    id: number,
    currentOrderId: number
}
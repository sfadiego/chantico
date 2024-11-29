import { QueryObserverResult, RefetchOptions, UseQueryResult } from "@tanstack/react-query"
import { IFileProps } from "./IFileProps"
import { ICategory } from "./ICategory";

export interface IProduct {
    id: number
    nombre: string,
    precio: number,
    descripcion: string,
    foto_id: number | null,
    picture: IFileProps,
    categoria_id: number,
    category: ICategory,
    activo: boolean,
};


export interface IProductContainerProps {
    productName?: string,
    categoryId: number,
    currentOrderId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}

export interface IProductProps {
    nombre: string,
    precio: number,
    picture: IFileProps,
    id: number,
    currentOrderId: number
}
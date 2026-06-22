import {
    QueryObserverResult,
    RefetchOptions,
} from "@tanstack/react-query";
import { IFileProps } from "./IFileProps";

export interface IProductContainerProps {
    productName?: string;
    categoryId: number;
    currentOrderId: number;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}

export interface IProductProps {
    nombre: string;
    precio: number;
    picture: IFileProps;
    id: number;
    currentOrderId: number;
}

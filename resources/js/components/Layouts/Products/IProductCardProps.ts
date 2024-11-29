import { QueryObserverResult, RefetchOptions, UseQueryResult } from "@tanstack/react-query";
import { IFileProps } from "../../../intefaces/IFileProps";

export interface IProductCardProps {
    picture?: IFileProps,
    id: number,
    price: number,
    name: string,
    classCard?: string,
    currentOrderId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}

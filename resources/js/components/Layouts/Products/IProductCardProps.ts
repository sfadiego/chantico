import { IFileProps } from "../../../intefaces/IFileProps";

export interface IProductCardProps {
    picture?: IFileProps,
    id:number,
    price: number,
    name: string,
    classCard?: string,
    currentOrderId: number
}

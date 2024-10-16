import { IFileProps } from "../../../intefaces/IFileProps";

export interface IProductCardProps {
    picture?: IFileProps,
    price: number,
    name: string,
    classCard?: string
}

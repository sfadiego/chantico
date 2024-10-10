import { IFileProps } from "../../../intefaces/IFileProps";

export interface IProductCardProps {
    image?: IFileProps,
    price: number,
    name: string,
    classCard?: string
}

import { IFileProps } from "./IFileProps"

export interface IProduct {
    id?: number
    nombre: string,
    precio: number,
    descripcion: string,
    foto_id: number | null,
    picture: IFileProps,
    categoria_id: number,
    activo: boolean,
};


export interface IProductContainerProps {
    searchProduct?: string,
    categoryId: number
}
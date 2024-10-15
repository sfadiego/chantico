import { IProduct } from "./IProduct";

export interface IOrderProduct {
    id?: number,
    producto_id: number,
    pedido_id: number,
    descuento: number,
    cantidad: number,
    precio: number,
    created_at: string,
    updated_at: string,
    product: IProduct
};
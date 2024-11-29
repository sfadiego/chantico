interface IOrderStatus {
    id: number,
    nombre: string,
    icon: string,

}
export interface IOrder {
    id: number,
    total: number,
    subtotal: number,
    descuento: number,
    nombre_pedido: number,
    estatus_pedido_id: number,
    sistema_id: number,
    created_at: string,
    updated_at: string,
    status: IOrderStatus
}
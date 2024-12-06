export interface IOrderReport {
    id: number,
    estatus_caja: number,
    efectivo_caja_inicio: number,
    efectivo_caja_cierre: number,
    venta_dia: number,
    observaciones: string,
    user_id: number,
    created_at: string,
}
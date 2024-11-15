import { useIndexOrder } from '@/services/useOrderService';
import React from 'react'
import { Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { IOrder } from '@/intefaces/IOrder';


const getOrders = () => {
    const { isLoading, data } = useIndexOrder();
    return {
        isLoading,
        showData: (!isLoading && data) && true,
        orders: data?.data,
    }
}

export const TableOrderList = () => {
    let { isLoading, orders } = getOrders();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Pedido</th>
                    <th>Total</th>
                    <th>SubTotal</th>
                    <th>Descuento</th>
                    <th>status</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(({ created_at,
                        descuento,
                        estatus_pedido_id,
                        id,
                        nombre_pedido,
                        subtotal,
                        total }: IOrder) => {
                        return <tr key={id}>
                            <td>{id}</td>
                            <td>{nombre_pedido}</td>
                            <td>{total}</td>
                            <td>{subtotal}</td>
                            <td>{descuento}</td>
                            <td>{estatus_pedido_id}</td>
                            <td>-</td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    )
}

import moment from 'moment';
import { useIndexOrder } from '@/services/useOrderService';
import { Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { IOrder } from '@/intefaces/IOrder';
import { OptionsOrderTable } from './OptionsOrderTable';
import { useState } from 'react';


const getOrders = () => {
    const { isLoading, refetch, data } = useIndexOrder();
    return {
        isLoading,
        refetch,
        showData: (!isLoading && data) && true,
        orders: data?.data,
    }
}

export const TableOrderList = () => {
    let { isLoading, orders, refetch } = getOrders();
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
                    <th>Estatus</th>
                    <th>Fecha</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(({ created_at,
                        descuento,
                        status,
                        id,
                        nombre_pedido,
                        subtotal,
                        total }: IOrder) => {
                        const date = moment(created_at).format("ll");
                        return <tr key={id}>
                            <td>{id}</td>
                            <td>{nombre_pedido}</td>
                            <td>{total}</td>
                            <td>{subtotal}</td>
                            <td>{descuento}</td>
                            <td>{status?.nombre}</td>
                            <td>{date}</td>
                            <td> <OptionsOrderTable refetch={refetch} orderId={id} /> </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    )
}

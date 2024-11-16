import React from 'react'
import moment from 'moment';
import { useIndexOrder } from '@/services/useOrderService';
import { Button, Table } from 'react-bootstrap'
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
                            <td>
                                <Button variant='info' className='ms-2'><i className="bi bi-printer"></i></Button>
                                <Button variant='info' className='ms-2'><i className="bi bi-currency-dollar"></i></Button>
                                <a className='btn btn-info ms-2 rounded-0' href={`/take-order/${id}`}>
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    )
}

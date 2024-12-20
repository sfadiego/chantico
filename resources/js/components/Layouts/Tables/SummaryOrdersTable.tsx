import { IOrder } from '@/intefaces/IOrder';
import moment from 'moment';
import React from 'react'
import { Table } from 'react-bootstrap';

interface IOrdersTableProps {
    orders: IOrder[]
}
export const SummaryOrdersTable = ({ orders }: IOrdersTableProps) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pedido</th>
                        <th>Total</th>
                        <th>SubTotal</th>
                        <th>Descuento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(({ created_at,
                            descuento,
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
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

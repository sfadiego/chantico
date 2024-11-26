import moment from 'moment';
import { useIndexOrder } from '@/services/useOrderService';
import { Button, Col, Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { IOrder } from '@/intefaces/IOrder';
import { OptionsOrderTable } from './OptionsOrderTable';
import { useEffect, useState } from 'react';
import { ModalNewOrder } from '../Modals/ModalNewOrder';
import { useAxios } from '@/hooks/useAxios';


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
    const { sistemaId } = useAxios();
    let { isLoading, orders, refetch } = getOrders();
    const [show, setShow] = useState(false);
    const closeModal = (show: boolean) => setShow(show)
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <Col md={12} className='mb-3'>
                <Button onClick={() => setShow(true)} variant="primary">
                    <i className="bi bi-plus-circle"></i> Nueva Orden
                </Button>
            </Col>
            <Col md={12}>
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
                <ModalNewOrder
                    refetch={refetch}
                    sistemaId={sistemaId}
                    closeModal={closeModal}
                    show={show} />
            </Col>
        </>
    )
}

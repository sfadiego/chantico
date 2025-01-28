import moment from 'moment';
import { useIndexOrder } from '@/services/useOrderService';
import { Button, Col, Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { IOrder } from '@/intefaces/IOrder';
import { OptionsOrderTable } from './OptionsOrderTable';
import { useEffect, useState } from 'react';
import { ModalNewOrder } from '../Modals/ModalNewOrder';
import { useAxios } from '@/hooks/useAxios';
import { EmptyData } from './EmptyData';
import { ModalCalculatePayment } from '../Modals/ModalCalculatePayment';


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
    const [showCalculatePayModal, setShowCalculatePayModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({
        orderId: 0,
        total: 0
    })
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    const handleSelectedOrder = (orderId: number, total: number) => {
        setSelectedOrder({ orderId, total });
        setShowCalculatePayModal(true);
    }
    const { orderId, total } = selectedOrder;
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
                                    <td> <OptionsOrderTable refetch={refetch}
                                        callbackSelected={handleSelectedOrder}
                                        total={total}
                                        orderId={id} /> </td>
                                </tr>
                            })
                        }
                        {
                            orders.length === 0 && <EmptyData />
                        }
                    </tbody>
                </Table>
                <ModalNewOrder
                    refetch={refetch}
                    sistemaId={sistemaId}
                    closeModal={closeModal}
                    show={show} />

                {
                    showCalculatePayModal && <ModalCalculatePayment
                        show={showCalculatePayModal}
                        total={total}
                        refetch={refetch}
                        orderId={orderId}
                        closeModal={setShowCalculatePayModal}
                    />
                }
            </Col>
        </>
    )
}

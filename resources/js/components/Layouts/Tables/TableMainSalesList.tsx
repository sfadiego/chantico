import { Col, Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { useState } from 'react';
import { ModalProduct } from '../Modals/ModalProduct';
import { useGetMainSalesIndex } from '@/services/useOpenSalesService';
import { IMainOrderReport } from '@/intefaces/IMainOrderReport';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface ITableMainSalesList {
    search?: string
}

const useGetMainSales = () => {
    let { isLoading, refetch, data } = useGetMainSalesIndex();
    return {
        showData: (!isLoading && data) && true,
        orderList: data?.data,
        isLoading,
        refetch
    }
}

export const TableMainSalesList = ({ search = '' }: ITableMainSalesList) => {
    const [show, setShow] = useState(false);
    const closeModal = (show: boolean) => setShow(show);
    const { isLoading, orderList, refetch } = useGetMainSales();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Efectivo al cerrar</th>
                            <th>Venta del dia</th>
                            <th>Observaciones</th>
                            <th>Status</th>
                            <th>Fecha</th>
                            <th>--</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.map(({
                                id,
                                observaciones,
                                venta_dia,
                                created_at,
                                efectivo_caja_cierre,
                                estatus_caja
                            }: IMainOrderReport) => {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{efectivo_caja_cierre}</td>
                                    <td>{venta_dia}</td>
                                    <td>{observaciones}</td>
                                    <td>{estatus_caja == 1 ? 'En curso' : '--'}</td>
                                    <td>
                                        {
                                            created_at ? moment(created_at).format("MMMM Do YYYY") : ' -- '
                                        }
                                    </td>
                                    <td>
                                        {
                                            estatus_caja == 0 && <Link to={`/admin/sales-summary/${id}`} className='btn btn-info ms-2 rounded-0' >
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <ModalProduct
                    refetch={refetch}
                    closeModal={closeModal}
                    show={show} />
            </Col>
        </>
    )
}

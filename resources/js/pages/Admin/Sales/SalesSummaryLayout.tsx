import React from 'react'
import { Col, Container, Image, Row, Table } from 'react-bootstrap'
import img from '@assets/logo_chantico.png';
import { useDetailOfCloseSales, useTotalCloseSales } from '@/services/useOpenSalesService';
import { useParams } from 'react-router-dom';
import LoadingComponent from '@/components/Layouts/LoadingComponent';
import moment from 'moment';
import { IOrder } from '@/intefaces/IOrder';
import { SummaryOrdersTable } from '@/components/Layouts/Tables/SummaryOrdersTable';


const useDetailSale = (systemId: number) => {
    const { isLoading, data, refetch } = useDetailOfCloseSales(systemId)
    return {
        isLoading: isLoading,
        showData: (!isLoading && data) && true,
        data: data?.data,
        refetch
    }
}

export const SalesSummaryLayout = () => {
    const { id } = useParams();
    const { isLoading, data, showData } = useDetailSale(parseInt(id!));
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    const { efectivo_caja_inicio, created_at, venta_dia, orders } = data;
    const date = moment(created_at).format("MMMM Do YYYY")
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <div className="col-md-auto">
                    <Image style={{ width: '15rem' }} className='img-fluid img-customer-login' src={img} />
                </div>
            </Row>
            <Row className=''>
                <Col md={12}>
                    <h1>Ventas de dia</h1>
                </Col>
                <Col md={12} className='mt-4'>
                    <p><b>Fecha</b>: {date}</p>
                    <p><b>Efectivo al iniciar ventas</b>: ${efectivo_caja_inicio}</p>
                    <p><b>Venta Total</b>: ${venta_dia}</p>
                </Col>
                <Col md={12} className='mt-4'>
                    <SummaryOrdersTable orders={orders}/>
                </Col>
            </Row>
        </Container >
    )
}

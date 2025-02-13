import React, { useEffect } from 'react'
import { useAxios } from '@/hooks/useAxios';
import { Container, Image, Row } from 'react-bootstrap';
import img from '@assets/logo_chantico.png';
import { AppConfig } from '@/configs/appConfig';
import { useActiveSale } from '../../../components/Layouts/Sales/hooks/useActiveSale';
import LoadingComponent from '../../../components/Layouts/LoadingComponent';
import { CloseSalesForm } from '../../../components/Layouts/Sales/CloseSalesForm';
import { useNavigate } from 'react-router-dom';
import { RoutesAdmin } from '@/router/modules/admin.routes';

const CloseSalesLayout = () => {
    const { sistemaId } = useAxios();
    const navigate = useNavigate();
    let { isLoading, showData, info } = useActiveSale();
    useEffect(() => {
        if (!info?.id) {
            navigate(RoutesAdmin.Dashboard);
        }
    }, [info])

    if (isLoading && !showData) return <LoadingComponent />;
    return (

        <Container>
            <Row className='justify-content-md-center'>
                <div className="col-md-auto">
                    <Image style={{ width: '15rem' }} className='img-fluid' src={img} />
                </div>
            </Row>
            <Row className='justify-content-md-center'>
                <div className="col-md-12 text-center">
                    <h1><b>{AppConfig.AppName}</b></h1>
                </div>
                <CloseSalesForm sistemaId={sistemaId} systemInfo={info}></CloseSalesForm>
            </Row>
        </Container >
    )
}
export default CloseSalesLayout;

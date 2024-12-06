import { Col, Container, Image, Row } from 'react-bootstrap'
import { AppConfig } from '../../../configs/appConfig';
import img from '@assets/logo_chantico.png';
import { OpenSalesForm } from '../../../components/Layouts/Sales/OpenSalesForm';
import { ActiveSale } from '@/components/Layouts/Sales/ActiveSale';

const OpenSalesLayout = () => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <div className="col-md-auto">
                    <Image style={{ width: '15rem' }} className='img-fluid img-customer-login' src={img} />
                </div>
            </Row>
            <Row className='justify-content-md-center'>
                <div className="col-md-12 text-center">
                    <h1>Bienvenidos a <b>{AppConfig.AppName}</b></h1>
                    <div className="alert alert-info" role="alert">
                        Indica el efectivo con el que iniciaras las ventas
                    </div>
                </div>
                <div className="col-md-12 mb-2">
                    <ActiveSale />
                </div>
                <div className="col-md-12">
                    <OpenSalesForm />
                </div>
            </Row>
        </Container>
    )
}

export default OpenSalesLayout; 
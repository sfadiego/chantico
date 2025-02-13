import { Col, Container, Image, Row } from 'react-bootstrap'
import { AppConfig } from '../../../configs/appConfig';
import img from '@assets/logo_chantico.png';
import { OpenSalesForm } from '../../../components/Layouts/Sales/OpenSalesForm';
import { ActiveSale } from '@/components/Layouts/Sales/ActiveSale';
import { useActiveSale } from '@/components/Layouts/Sales/hooks/useActiveSale';
import { SalesStatusEnum } from '@/enums/SalesStatusEnum';
import LoadingComponent from '@/components/Layouts/LoadingComponent';

const Component = ({ status }: { status: number }) => {
    if (status == SalesStatusEnum.Open) {
        return <ActiveSale />;
    }

    return <OpenSalesForm />
}

const OpenSalesLayout = () => {
    let { isLoading, showData, info, refetch } = useActiveSale();
    if (isLoading && !showData) return <LoadingComponent />;
    const { estatus_caja } = info;

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <div className="col-md-auto">
                    <Image style={{ width: '15rem' }} className='img-fluid' src={img} />
                </div>
            </Row>
            <Row className='justify-content-md-center'>
                <div className="col-md-12 text-center">
                    <h1>Bienvenidos a <b>{AppConfig.AppName}</b></h1>
                </div>
                <div className="col-md-12 mt-2 mb-2">
                    <Component status={estatus_caja} />
                </div>
            </Row>
        </Container>
    )
}

export default OpenSalesLayout;
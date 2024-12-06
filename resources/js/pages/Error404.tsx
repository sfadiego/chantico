import {  Card, CardBody, CardHeader, Col, Container, Image, Row } from 'react-bootstrap';
import img from '@assets/logo_chantico.png';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col xl={10} lg={10} md={10} >
                        <Card className='o-hidden border-0 shadow-lg my-5'>
                            <Card.Body className='p-0'>
                                <Row>
                                    <Col md={12} className='text-center'>
                                        <div className='p-5'>
                                            <Image className='img-fluid img-customer-login' src={img}></Image>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <Card className="text-center">
                                            <CardHeader>
                                                <div className="mx-auto error" data-text="404">404</div>
                                            </CardHeader>
                                            <CardBody>
                                                <p className="lead text-gray-800 mb-3">Pagina no encontrada</p>
                                                <div className='mb-3 d-grid gap-2'>
                                                    <Link to="/">&larr; Regresar </Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Error404;

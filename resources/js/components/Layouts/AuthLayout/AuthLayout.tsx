import React, { Component, ReactNode } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import img from '@assets/logo_chantico.png';

interface IAuthLayout {
    children: ReactNode
}
const AuthLayout = ({ children }: IAuthLayout) => {
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xl={6} lg={10} md={10} >
                    <Card className='o-hidden border-0 shadow-lg my-5'>
                        <Card.Body className='p-0'>
                            <Row>
                                <Col md={12} className='text-center'>
                                    <div className='p-5'>
                                        <Image className='img-fluid img-customer-login' src={img}></Image>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    {children}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthLayout;
import React from "react";
import { Button, Form, Row } from "react-bootstrap";
const RegisterForm = () => {
    return (
        <>
            <div className='p-5'>
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Registrar Usuario</h1>
                </div>
                <Form className="">
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Usuario" />
                    </Form.Group>
                    <Row>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Control type="text" placeholder="Nombre" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Control type="text" placeholder="Apellido" />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Confirmar Contraseña" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-grid gap-2">
                        <Button variant='primary' type='button'>
                            Registrar
                        </Button>
                    </Form.Group>

                </Form>
            </div>
        </>
    );
}
export default RegisterForm;
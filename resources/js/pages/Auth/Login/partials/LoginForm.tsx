import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
    return (
        <>
            <div className='p-5'>
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Bienvenido!</h1>
                </div>
                <Form className="user">
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-grid gap-2">
                        <Button variant='primary' type='button'>
                            Iniciar Sesion
                        </Button>
                    </Form.Group>

                </Form>
            </div>
        </>
    )
}

export default LoginForm;
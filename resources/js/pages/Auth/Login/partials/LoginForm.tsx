import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useServiceLogin } from '@/services/auth/useServiceAuth'
import { ErrorMessage, Formik, Field, Form } from 'formik'
import * as Yup from 'yup';


const LoginForm = () => {
    const [loginState, setLoginState] = useState({ email: '', password: '' });
    const mutation = useServiceLogin();

    let schema = Yup.object({
        email: Yup.string().required('Requerido').email('Email inválido'),
        password: Yup.string().required('Requerido'),
    })


    let handleSubmit = async (data) => {
        try {
            await console.log("submit1", data);
            // await mutation.mutateAsync();
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <div className='p-5'>
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Bienvenido!</h1>
                </div>
                <Formik
                    initialValues={loginState}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="firstName">First Name</label>
                                <Field
                                    className="form-control"
                                    type="email"
                                    name='email'
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" className="text-danger p-1" component="div" />
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor="password">password</label>
                                <Field type="password"
                                    name='password'
                                    className="form-control"
                                    placeholder="Password" />
                                <ErrorMessage name="password" className="text-danger p-1" component="div" />
                            </div>
                            <Button
                                disabled={isSubmitting || mutation.isPending}
                                variant='primary'
                                type='submit'
                            >
                                Iniciar Sesion
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default LoginForm;
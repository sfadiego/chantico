import { Button } from 'react-bootstrap'
import { ErrorMessage, Formik, Field, Form } from 'formik'
import { useServiceLogin } from '@/services/auth/useServiceAuth'
import { useLogin } from '../useLogin';

const LoginForm = () => {
    const mutation = useServiceLogin();
    const props = useLogin({ mutateAsync: mutation.mutateAsync });

    return (
        <>
            <div className='p-5 pt-2'>
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-3">Bienvenido</h1>
                </div>
                <Formik {...props} >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="firstName">Correo</label>
                                <Field
                                    className="form-control"
                                    type="email"
                                    name='email'
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" className="text-danger p-1" component="div" />
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor="password">Contraseña</label>
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
            </div >
        </>
    )
}

export default LoginForm;
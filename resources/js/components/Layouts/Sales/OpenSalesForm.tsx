import { Button } from 'react-bootstrap'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useStoreOpenSales } from '@/services/useOpenSalesService.ts';
import { useOpenSales } from './hooks/useOpenSale.tsx';
import { Textarea } from '@/components/Textarea/Textarea.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios.tsx';
import { RoleEnum } from '@/enums/RoleEnum.ts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const OpenSalesForm = () => {
    const { user: { id, rol_id } } = useAxios();
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState(0);

    useEffect(() => {
        if (id) { setCurrentUserId(id); }
    }, [id]);


    const dashboardPath = `${rol_id == RoleEnum.Admin ? '/admin' : '/user'}`;
    const mutate = useStoreOpenSales();
    const props = useOpenSales({
        mutateAsync: mutate.mutateAsync,
        onSuccess({ success }) {
            if (success) {
                navigate(`${dashboardPath}/dashboard`);
            }
        },
        onError: ({ response }) => {
            const { data: { message } } = response;
            toast.error(message);
        }
    });
    let initialValues = {
        ...props.initialValues,
        user_id: currentUserId
    }

    return (
        <>
            <div className="alert alert-info" role="alert">
                Indica el efectivo con el que iniciaras las ventas
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={props.onSubmit}
                validationSchema={props.validationSchema}
                enableReinitialize
            >
                {({ isSubmitting, errors, values, handleChange, handleBlur }) => (
                    < Form>
                        <div className='mb-3 text-start'>
                            <label className='form-label' htmlFor="">Efectivo inicial: </label>
                            <Field
                                className="form-control"
                                type="number"
                                name='efectivo_caja_inicio'
                                placeholder="Efectivo inicial"
                            />
                            <ErrorMessage name="efectivo_caja_inicio" className="text-danger p-1" component="div" />
                        </div>
                        <div className='mb-3 text-start'>
                            <Textarea
                                label='Observaciones'
                                textareaId='observaciones'
                                formikErrors={errors}
                                formikValues={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                        </div>
                        <div className='mb-3'>
                            <Field type="hidden" name="user_id"></Field>
                            <ErrorMessage name="user_id" className="text-danger" component="div" />
                        </div>

                        <div className='pt-3 my-modal-footer'>
                            <Link
                                className='btn btn-secondary me-2'
                                to={`${dashboardPath}/dashboard`}>
                                Regresar
                            </Link>
                            <Button
                                disabled={isSubmitting || mutate.isPending}
                                variant='primary'
                                type='submit'
                            >
                                <i className="bi bi-coin"></i> Iniciar Ventas
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

        </>
    )

}
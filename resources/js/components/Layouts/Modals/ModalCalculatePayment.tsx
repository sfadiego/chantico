import * as Yup from 'yup';
import { Alert, Button } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import MyModal from './Index';
import { useState } from 'react';
import { useUpdateOrder } from '@/services/useOrderService';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface IModalCalculatePayment {
    show: boolean,
    total: number,
    orderId: number,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
    closeModal: (props: boolean) => void,
}

export const ModalCalculatePayment = ({ show, orderId, total, refetch, closeModal }: IModalCalculatePayment) => {
    const title = `Calcular Pago`;
    const [calculate, setCalculate] = useState({ pago: 0, cambio: 0 });
    const { pago, cambio } = calculate;
    const mutate = useUpdateOrder(orderId);
    const handleSubmit = () => {
        const { onSubmit } = useOnSubmit({
            mutateAsync: mutate.mutateAsync,
            onSuccess: (data) => {
                closeModal(false);
                refetch();
                toast.success(`Cuenta pagada correctamente.`);
            }
        });

        onSubmit({ estatus_pedido_id: OrderStatusEnum.Closed }, {
            setErrors: (errors: any) => {
                console.log("errors", errors);
                toast.success(`Ha ocurrido un error`);
            }
        });
    }

    const formValues = {
        pago,
    }

    const validationSchema = Yup.object({
        pago: Yup.number().min(total, `Monto minimo ${total} peso`)
            .required('Este campo es obligatorio')
    });

    return (
        <MyModal modalTitle={title} show={show} >
            <Formik
                initialValues={formValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    < Form >
                        <div className='mb-3'>
                            <h2>Total : ${total}</h2>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="pago">Pago: </label>
                            <Field
                                className="form-control"
                                type="number"
                                name='pago'
                                placeholder="$"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const pago = parseFloat(e.target.value) || 0;
                                    const cambio = parseFloat((pago - total).toFixed(2));
                                    setCalculate({
                                        pago: pago,
                                        cambio
                                    });
                                }}
                            />
                            <ErrorMessage name="pago" className="text-danger p-1" component="div" />
                        </div>
                        <div className='mb-3'>
                            <Alert variant={`warning`}>
                                Tu cambio es: ${cambio <= 0 ? 0 : cambio}
                            </Alert>
                        </div>
                        <div className='pt-3 my-modal-footer'>
                            <Button
                                onClick={() => closeModal(false)}
                                className="me-2"
                                variant="secondary">
                                Cerrar
                            </Button>
                            <Button
                                disabled={isSubmitting || cambio <= 0}
                                variant='primary'
                                type='submit'
                            >
                                Continuar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </MyModal>
    )
}

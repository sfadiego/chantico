import "@css/modal.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Button } from 'react-bootstrap';
import { useStoreOrder } from '@/services/useOrderService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyModal from "./Index";
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";

interface ModalNewOrderProps {
    sistemaId: number,
    show: boolean,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

const useHandleOrder = ({ mutateAsync, sistemaId, refetch, closeModal }) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            refetch()
            closeModal(false)
        },
    });
    const validationSchema = Yup.object({
        total: Yup.number().min(0, 'El total no es valido').required('Este campo es obligatorio'),
        subtotal: Yup.number().min(0, 'El subtotal no es valido').required('Este campo es obligatorio'),
        sistema_id: Yup.number().required('El Id del sistema no se encuentra en la peticion'),
        nombre_pedido: Yup.string().required('Este campo es obligatorio'),
        estatus_pedido_id: Yup.number().required('Este campo es obligatorio'),
    });

    const initialValues = {
        total: 0,
        subtotal: 0,
        sistema_id: sistemaId,
        nombre_pedido: "",
        estatus_pedido_id: OrderStatusEnum.InProcess,
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

export const ModalNewOrder = ({ show, closeModal, refetch, sistemaId }: ModalNewOrderProps) => {
    const mutate = useStoreOrder();
    const props = useHandleOrder({ mutateAsync: mutate.mutateAsync, refetch, closeModal, sistemaId });
    const title = "Crear Pedido";
    return (
        <MyModal modalTitle={title} show={show} >
            <Formik {...props} >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="firstName">Nombre de la mesa </label>
                            <Field
                                className="form-control"
                                type="text"
                                name='nombre_pedido'
                                placeholder="Nombre de la mesa"
                            />
                            <ErrorMessage name="nombre_pedido" className="text-danger p-1" component="div" />
                        </div>
                        <div className='mb-3'>
                            <Field type="hidden" name="sistema_id"></Field>
                            <ErrorMessage name="sistema_id" className="text-danger" component="div" />
                        </div>
                        <div className='mb-3'>
                            <Field type="hidden" name="estatus_pedido_id"></Field>
                            <ErrorMessage name="estatus_pedido_id" className="text-danger" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="firstName">Total </label>
                            <Field
                                className="form-control"
                                type="number"
                                name='total'
                                placeholder="total"
                            />
                            <ErrorMessage name="total" className="text-danger p-1" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="firstName">Subtotal </label>
                            <Field
                                className="form-control"
                                type="number"
                                name='subtotal'
                                placeholder="subtotal"
                            />
                            <ErrorMessage name="subtotal" className="text-danger p-1" component="div" />
                        </div>
                        <div className='pt-3 my-modal-footer'>
                            <Button
                                onClick={() => closeModal(false)}
                                className="me-2"
                                variant="secondary">
                                Cerrar
                            </Button>
                            <Button
                                disabled={isSubmitting || mutate.isPending}
                                variant='primary'
                                type='submit'
                            >
                                Crear
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </MyModal>
    )
}

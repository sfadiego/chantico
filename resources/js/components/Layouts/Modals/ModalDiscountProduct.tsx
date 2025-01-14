import "@css/modal.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Button } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import MyModal from "./Index";
import { useUpdateOrderProduct } from "@/services/useOrderProductService";
import { useUpdateDiscount } from "@/hooks/useOrderProduct";
import { useEffect, useState } from "react";

interface ModalDiscountProductProps {
    orderId: number,
    productId: number,
    descuento: number,
    show: boolean,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const ModalDiscountProduct = ({ show, productId, descuento, orderId, closeModal, refetch, }: ModalDiscountProductProps) => {
    const title = "Agregar descuento a producto";
    const mutate = useUpdateOrderProduct(orderId, productId);
    const [formValues, setFormValues] = useState({ descuento: 0 });

    const props = useUpdateDiscount({
        mutateAsync: mutate.mutateAsync,
        closeModal,
        refetch
    });

    useEffect(() => {
        if (productId) {
            setFormValues({
                descuento: descuento,
            });
        }
    }, [productId]);

    return (
        <MyModal modalTitle={title} show={show} >
            <Formik
                initialValues={formValues}
                onSubmit={props.onSubmit}
                validationSchema={props.validationSchema}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="firstName">Descuento % </label>
                            <Field
                                className="form-control"
                                type="number"
                                name='descuento'
                                placeholder="descuento"
                            />
                            <ErrorMessage name="descuento" className="text-danger p-1" component="div" />
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
                                Guardar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </MyModal>
    )
}

import "@css/modal.css";
import { Button } from 'react-bootstrap';
import { useUpdateOrder } from '@/services/useOrderService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyModal from "./Index";
import { useOnSubmit } from '@/hooks/useOnSubmit';

interface ModalDiscountOrderProps {
    orderId: number
}
const useHandleOrder = ({ mutateAsync }) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            console.log(data);
        },
    });
    const validationSchema = Yup.object({
        descuento: Yup.number().required().positive().integer(),
    });

    const initialValues = {
        descuento: 10
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

export const ModalDiscountOrder = ({ orderId }: ModalDiscountOrderProps) => {
    const mutate = useUpdateOrder(orderId);
    const props = useHandleOrder({ mutateAsync: mutate.mutateAsync });
    const title = "Agregar descuento";
    return (
        <MyModal modalTitle={title} show={true} >
            <Formik {...props} >
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

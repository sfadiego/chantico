import "@css/modal.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import MyModal from "./Index";
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useNavigate } from "react-router-dom";
import { useStoreProduct } from "@/services/useProductService";
import { SelectCategory } from "@/components/Select/SelectCategory";
import { toast } from "react-toastify";



interface IModalProductProps {
    productId?: number,
    show: boolean,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

const useHandleProduct = ({ mutateAsync, refetch, closeModal }) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: ({ data: { nombre } }) => {
            refetch()
            toast.success(`El producto ${nombre} se agrego correctamente.`);
            closeModal(false)
        },
    });
    const validationSchema = Yup.object({
        nombre: Yup.string().required('Este campo es obligatorio'),
        precio: Yup.number().min(1, 'El precio no es valido').required('Este campo es obligatorio'),
        categoria_id: Yup.number().required('La categoria es requerida'),
    });

    const initialValues = {
        nombre: '',
        precio: 0,
        categoria_id: ""
    };
    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

export const ModalProduct = ({ productId, show, closeModal, refetch }: IModalProductProps) => {
    const mutate = useStoreProduct();
    const props = useHandleProduct({ mutateAsync: mutate.mutateAsync, refetch, closeModal });
    const title = `${productId ? 'Actualizar' : 'Crear'} Producto`;

    return (
        <MyModal modalTitle={title} show={show} >
            <Formik {...props} >
                {({ isSubmitting, errors, values, handleChange, handleBlur }) => (

                    < Form >

                        <div className='mb-3'>
                            <label className='form-label' htmlFor="">Nombre de Producto </label>
                            <Field
                                className="form-control"
                                type="text"
                                name='nombre'
                                placeholder="Producto"
                            />
                            <ErrorMessage name="nombre" className="text-danger p-1" component="div" />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="">Precio </label>
                            <Field
                                className="form-control"
                                type="number"
                                name='precio'
                                placeholder="precio"
                            />
                            <ErrorMessage name="precio" className="text-danger p-1" component="div" />
                        </div>
                        <div className='mb-3'>
                            {
                                <SelectCategory
                                    selectId={`categoria_id`}
                                    formikErrors={errors}
                                    formikValues={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            }
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
        </MyModal >
    )
}

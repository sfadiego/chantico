import "@css/modal.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import MyModal from "./Index";
import { Button } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useStoreProduct } from "@/services/useProductService";
import { SelectCategory } from "@/components/Select/SelectCategory";
import { useProduct } from "../Products/hooks/useProduct";
import { Textarea } from "@/components/Textarea/Textarea";
import { toast } from "react-toastify";
import { useCategory } from "../Categories/hooks/useCategory";

interface IModalProductProps {
    productId?: number,
    show: boolean,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const ModalCategory = ({ show, closeModal, refetch }: IModalProductProps) => {
    const mutate = useStoreProduct();
    const props = useCategory({
        mutateAsync: mutate.mutateAsync, onSuccess({ data: { nombre } }) {
            refetch()
            toast.success(`La categoria ${nombre} se agrego correctamente.`);
            closeModal(false);
        }
    });
    const title = `Crear Producto`;

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
                        <div className='mb-3'>
                            <Textarea
                                label='Descripcion'
                                textareaId='descripcion'
                                formikErrors={errors}
                                formikValues={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
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

import "@css/modal.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import MyModal from "./Index";
import { Button } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from "react-toastify";
import { useCategory } from "../Categories/hooks/useCategory";
import { useStoreCategory } from "@/services/useCategoriesService";

interface IModalProductProps {
    productId?: number,
    show: boolean,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const ModalCategory = ({ show, closeModal, refetch }: IModalProductProps) => {
    const mutate = useStoreCategory();
    const props = useCategory({
        mutateAsync: mutate.mutateAsync, onSuccess({ data: { nombre } }) {
            refetch()
            toast.success(`La categoria ${nombre} se agrego correctamente.`);
            closeModal(false);
        }
    });
    const title = `Crear categoria`;

    return (
        <MyModal modalTitle={title} show={show} >
            <Formik {...props} >
                {({ isSubmitting, errors, values, handleChange, handleBlur }) => (
                    < Form >
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="">Nombre de categoria </label>
                            <Field
                                className="form-control"
                                type="text"
                                name='nombre'
                                placeholder="Nombre de categoria"
                            />
                            <ErrorMessage name="nombre" className="text-danger p-1" component="div" />
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

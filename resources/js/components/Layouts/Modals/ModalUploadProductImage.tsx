import MyModal from './Index'
import { Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useUpdateProductImage } from '@/services/useProductService';
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import * as Yup from 'yup';
import { File } from '@/components/Inputs/File/File';
import { imageTypes } from '@/enums/FileImageTypesEnum';
import { toast } from 'react-toastify';
import useUploadProductImage from '../Products/hooks/useUploadProductImage';

interface IModalUploadProductImage {
    show: boolean,
    productId: number,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}

export const ModalUploadProductImage = ({ show, productId, closeModal, refetch }: IModalUploadProductImage) => {
    const title = `Subir Imagen Producto`;
    const mutate = useUpdateProductImage(productId);
    const { initialValues, onSubmit, validationSchema } = useUploadProductImage({
        mutateAsync: mutate.mutateAsync,
        closeModal,
        refetch
    });

    const validateFile = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void): void => {
        const MAX_SIZE = 5000000; // 5MB
        const uploadedFile = event.currentTarget?.files ? event.currentTarget.files[0] : undefined;
        if (!uploadedFile) {
            toast.error(`El archivo no es válido`);
            return;
        }
        const { size } = uploadedFile;
        if (size > MAX_SIZE) {
            toast.error(`El archivo es muy grande`);
            return;
        }

        setFieldValue('file', uploadedFile);
    }

    return (
        <>
            <MyModal modalTitle={title} show={show} >
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {({ isSubmitting, errors, values, setFieldValue, handleChange }) => (
                        < Form >
                            <div className='mb-3'>
                                <File
                                    formikErrors={errors}
                                    acceptInputTypes={imageTypes()}
                                    label={`imagen de producto`}
                                    inputId={`file`}
                                    onChangeEvent={(e) => validateFile(e, setFieldValue)}
                                />
                            </div>
                            <Button
                                disabled={isSubmitting || mutate.isPending}
                                variant='primary'
                                type='submit'
                            >
                                <i className="bi bi-upload"></i> Cargar Imagen
                            </Button>

                        </Form>
                    )}
                </Formik>
            </MyModal >
        </>
    )
}
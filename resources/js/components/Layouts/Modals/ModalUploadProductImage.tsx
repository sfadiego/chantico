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

interface IModalUploadProductImage {
    show: boolean,
    productId: number,
    closeModal: (props: boolean) => void,
}

const useUploadProductImage = ({ mutateAsync, closeModal, refetch }: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>,
    closeModal: (props: boolean) => void,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}) => {
    const MAX_SIZE = 5000000; // 5MB
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => {
            toast.success(`La imagen se cargo correctamente`);
            closeModal(false);
            refetch();
        },
    });

    const validationSchema = Yup.object({
        file: Yup.mixed()
            .required('Este campo es obligatorio')
        // .test('fileSize', 'El archivo es demasiado grande', (value) => value && (value as File).size <= MAX_SIZE)
        // .test('fileType', 'Solo se aceptan los siguientes tipos: jpg, jpeg, png', (value) => {
        //     const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        //     return value instanceof File && allowedTypes.includes((value as File).type);
        // })
    });

    const initialValues = {
        file: undefined,
    };

    return {
        initialValues,
        validationSchema,
        onSubmit,
    }
}

export const ModalUploadProductImage = ({ show, productId, closeModal, refetch }: IModalUploadProductImage) => {
    const title = `Subir Imagen Producto`;
    const mutate = useUpdateProductImage(productId);
    const { initialValues, onSubmit, validationSchema } = useUploadProductImage({
        mutateAsync: mutate.mutateAsync,
        closeModal,
        refetch
    });

    const validateFile = (event, setFieldValue) => {
        const MAX_SIZE = 5000000; // 5MB
        const uploadedFile = event.currentTarget?.files ? event.currentTarget.files[0] : undefined;
        if (!uploadedFile) {
            toast.error(`La no es valida`);
        }
        const { size } = uploadedFile;
        if (size > MAX_SIZE) {
            toast.error(`La es muy grande`);
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
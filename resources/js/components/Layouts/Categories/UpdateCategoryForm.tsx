import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useProduct } from '../Products/hooks/useProduct';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SelectCategory } from '@/components/Select/SelectCategory';
import { Textarea } from '@/components/Textarea/Textarea';
import { RoutesAdmin } from '@/router/modules/admin.routes';
import { useShowProduct, useUpdateProduct } from "@/services/useProductService";
import { Button, Col, Row } from 'react-bootstrap';
import LoadingComponent from '../LoadingComponent';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useHandleGetProduct = (productId: number) => {
  const { isLoading, data, refetch } = useShowProduct(productId)
  return {
    isLoading,
    showData: (!isLoading && data) && true,
    data: data?.data,
    refetch
  }
}

export const UpdateCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate(RoutesAdmin.ProductList);
  }

  const [formValues, setInitialValues] = useState({
    nombre: '',
    precio: 0,
    categoria_id: 0,
    descripcion: ""
  });

  const { isLoading, showData, data } = useHandleGetProduct(parseInt(id!!));

  if (isLoading && showData) return <LoadingComponent></LoadingComponent>;
  useEffect(() => {
    if (data) {
      setInitialValues({
        nombre: data.nombre,
        precio: data.precio,
        categoria_id: data.categoria_id,
        descripcion: data.descripcion
      });
    }
  }, [data]);

  const mutate = useUpdateProduct(parseInt(id!!));
  const props = useProduct({
    mutateAsync: mutate.mutateAsync, onSuccess({ data: { nombre } }) {
      toast.success(`El producto ${nombre} se actualizo correctamente.`);
    }
  });
  return (
    <>
      <Formik
        initialValues={formValues}
        onSubmit={props.onSubmit}
        validationSchema={props.validationSchema}
        enableReinitialize
      >
        {({ isSubmitting, errors, values, handleChange, handleBlur }) => (
          <Form>
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
              <label className='form-label'>Precio </label>
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
              <Link
                className='btn btn-secondary me-2'
                to={RoutesAdmin.ProductList}>
                Regresar
              </Link>
              <Button
                disabled={isSubmitting || mutate.isPending}
                variant='primary'
                type='submit'
              >
                <i className="bi bi-floppy"></i> Actualizar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

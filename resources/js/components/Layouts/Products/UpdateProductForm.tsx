import { SelectCategory } from '@/components/Select/SelectCategory';
import { Textarea } from '@/components/Textarea/Textarea';
import { RoutesAdmin } from '@/router/modules/admin.routes';
import { useShowProduct, useUpdateProduct } from '@/services/useProductService';
import { ErrorMessage, Field, Formik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap';
import { Form, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent';
import { useEffect, useState } from 'react';
import { useHandleUpdateProduct } from '@/pages/Admin/Product/useHandleUpdateProduct';

const useHandleGetProduct = (productId: number) => {
  const { isLoading, data, refetch } = useShowProduct(productId)
  return {
    isLoading,
    showData: (!isLoading && data) && true,
    data: data?.data,
    refetch
  }
}

export const UpdateProductForm = () => {
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

  const mutation = useUpdateProduct(parseInt(id!!));
  const props = useHandleUpdateProduct({ mutateAsync: mutation.mutateAsync });
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

  return (
    <>
      <Row>
        <Col md={12}>
          <Formik
            initialValues={formValues}
            onSubmit={props.onSubmit}
            validationSchema={props.validationSchema}
            enableReinitialize
          >
            {({ isSubmitting, errors, values, handleChange, handleBlur }) => (
              < Form >
                <div className='mb-3'>
                  <label className='form-label'>Nombre de Producto </label>
                  <Field
                    className="form-control"
                    type="text"
                    name='nombre'
                    placeholder="Producto"
                  ></Field>
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
                  <Button
                    disabled={isSubmitting || mutation.isPending}
                    variant='primary'
                    type='submit'
                  >
                    <i className="bi bi-floppy"></i> Actualizar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

        </Col>
      </Row >
    </>
  )
}

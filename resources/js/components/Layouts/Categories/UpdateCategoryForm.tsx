import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RoutesAdmin } from '@/router/modules/admin.routes';
import { Button } from 'react-bootstrap';
import LoadingComponent from '../LoadingComponent';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useShowCategory, useUpdateCategory } from '@/services/useCategoriesService';
import { useCategory } from './hooks/useCategory';

const useHandleGetCateogy = (categoryId: number) => {
  const { isLoading, data, refetch } = useShowCategory(categoryId)
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
    navigate(RoutesAdmin.CategoryList);
  }

  const [formValues, setInitialValues] = useState({
    nombre: '',
    orden: 1,
  });

  const { isLoading, showData, data } = useHandleGetCateogy(parseInt(id!!));
  if (isLoading && showData) return <LoadingComponent></LoadingComponent>;
  useEffect(() => {
    if (data) {
      setInitialValues({
        nombre: data.nombre,
        orden: data.orden ? data.orden : 1,
      });
    }
  }, [data]);

  const mutate = useUpdateCategory(parseInt(id!!));
  const props = useCategory({
    mutateAsync: mutate.mutateAsync, onSuccess({ data: { nombre } }) {
      toast.success(`La categoria ${nombre} se actualizo correctamente`);
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
              <label className='form-label' htmlFor="">Nombre de categoria </label>
              <Field
                className="form-control"
                type="text"
                name='nombre'
                placeholder="Producto"
              />
              <ErrorMessage name="nombre" className="text-danger p-1" component="div" />
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="">Orden de secuencia</label>
              <Field
                className="form-control"
                type="number"
                name='orden'
                placeholder="orden"
              />
              <ErrorMessage name="orden" className="text-danger p-1" component="div" />
            </div>
            <div className='pt-3 my-modal-footer'>
              <Link
                className='btn btn-secondary me-2'
                to={RoutesAdmin.CategoryList}>
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

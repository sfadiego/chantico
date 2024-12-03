import { useIndexCategories } from '@/services/useCategoriesService';
import LoadingComponent from '../Layouts/LoadingComponent';
import { ICategory } from '@/intefaces/ICategory';

interface ISelectCategoryProps {
    selectId: string,
    formikErrors?: any,
    formikValues?: any,
    handleChange: any,
    handleBlur: any,
}

const getCategories = () => {
    let { isLoading, data, refetch } = useIndexCategories();
    return {
        showData: (!isLoading && data) && true,
        categories: data?.data,
        isLoading
    }
}
export const SelectCategory = ({ formikErrors, handleChange, handleBlur, formikValues, selectId }: ISelectCategoryProps) => {
    let { isLoading, categories, showData } = getCategories();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <label className='form-label' htmlFor="categoria">Categoria </label>
            <select
                id={selectId}
                name={selectId}
                value={formikValues[selectId]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control">
                <option value="">Seleccionar...</option>
                {
                    showData && categories.map(({ id, nombre }: ICategory, key: number) =>
                        <option key={key} value={id}>{nombre}</option>)
                }
            </select>
            {
                formikErrors[selectId] && <div className="text-danger p-1">{formikErrors[selectId]}</div>
            }
        </>
    )
}

import { Button, Dropdown, ListGroup, Offcanvas, Row } from 'react-bootstrap'
import { useIndexCategories } from '@/services/useCategoriesService';
import LoadingComponent from '../LoadingComponent';
import { ICategory } from '@/intefaces/ICategory';
import { OffCanvasMoreCatgories } from './OffCanvasMoreCatgories';
import { SingleCategoryTab } from './SingleCategoryTab';

const limitInList = 5;
export const CategoriesTabs = () => {
    const { isLoading, data: categories } = useIndexCategories();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    const { data } = categories;
    const categoriesFiltered = data.slice(0, limitInList);
    const excedLimit = data.length > limitInList;
    return (

        <Row className='mt-1'>
            <div className="col-12">
                <h3>Categorias</h3>
            </div>
            <div className="col-md-12">
                <div className="d-flex mb-3 border">
                    <div className="p-2 border">
                        <i className="bi bi-list-check"></i>
                        <span className='ms-1'>Todos</span>
                    </div>
                    {
                        categoriesFiltered.map(({ id, nombre }: ICategory) =>
                            <SingleCategoryTab key={id} nombre={nombre}></SingleCategoryTab>)
                    }

                    {
                        excedLimit && (
                            <div className="border">
                                <OffCanvasMoreCatgories categories={data} placement={'end'} name={'end'} />
                            </div>
                        )
                    }
                </div>
            </div>
        </Row>
    )
}

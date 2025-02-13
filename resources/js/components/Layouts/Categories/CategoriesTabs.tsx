import { Row } from 'react-bootstrap'
import { useIndexCategories } from '@/services/useCategoriesService';
import LoadingComponent from '../LoadingComponent';
import { ICategory } from '@/intefaces/ICategory';
import { OffCanvasMoreCatgories } from './OffCanvasMoreCatgories';
import { SingleCategoryTab } from './SingleCategoryTab';
import { useState } from 'react';

const limitInList = 5;
interface CategoriesTabProps {
    selectCategory: (categoryId: number) => void,
    activeTab: number,
    setactiveTab: (categoryId: number) => void,
}

export const CategoriesTabs = ({ selectCategory, activeTab, setactiveTab }: CategoriesTabProps) => {
    const { isLoading, data: categories } = useIndexCategories();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    const { data } = categories;
    const categoriesFiltered = data.slice(0, limitInList);
    const excedLimit = data.length > limitInList;
    return (
        <Row className='mt-1'>
            <div className="col-12">
                <h3>Categorías</h3>
            </div>
            <div className="col-md-12">
                <div className="d-flex mb-3 border">
                    <div role="button" onClick={() => {
                        selectCategory(0)
                        setactiveTab(0)

                    }} className={`p-2 border ${!activeTab ? 'bg-warning-subtle' : ''}`}>
                        <i className="bi bi-list-check"></i>
                        <span className='ms-1'>Todos</span>
                    </div>
                    {
                        categoriesFiltered.map(({ id, nombre }: ICategory) =>
                            <SingleCategoryTab
                                key={id}
                                id={id}
                                activeTab={activeTab}
                                setactiveTab={setactiveTab}
                                selectCategory={selectCategory}
                                nombre={nombre}></SingleCategoryTab>
                        )
                    }

                    {
                        excedLimit && (
                            <div className="border">
                                <OffCanvasMoreCatgories
                                    selectCategory={selectCategory}
                                    categories={data}
                                    activeTab={activeTab}
                                    setactiveTab={setactiveTab}
                                    placement={'end'}
                                    name={'end'}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </Row>
    )
}

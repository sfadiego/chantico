import { Button, Col, Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { useState } from 'react';
import { IProduct } from '@/intefaces/IProduct';
import { useIndexCategories } from '@/services/useCategoriesService';
import { OptionsCategoryTable } from './OptionsCategoryTable';
import { ModalCategory } from '../Modals/ModalCategory';
import { ICategory } from '@/intefaces/ICategory';


const getCategories = () => {
    let { isLoading, data, refetch } = useIndexCategories();
    return {
        showData: (!isLoading && data) && true,
        categories: data?.data,
        isLoading,
        refetch
    }
}


export const TableCategoryList = () => {
    const [show, setShow] = useState(false);
    const closeModal = (show: boolean) => setShow(show);
    let { isLoading, categories, refetch } = getCategories();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <Col md={12} className='mb-3'>
                <Button onClick={() => setShow(true)} variant="primary">
                    <i className="bi bi-plus-circle"></i> Nueva Categoria
                </Button>
            </Col>
            <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(({ id, nombre, orden }: ICategory) => {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nombre}</td>
                                    <td>{orden}</td>
                                    <td>
                                        <OptionsCategoryTable refetch={refetch} categoryId={id!!} />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <ModalCategory
                    refetch={refetch}
                    closeModal={closeModal}
                    show={show} />
            </Col>
        </>
    )
}

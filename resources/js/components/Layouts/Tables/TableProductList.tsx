import { Button, Col, Table } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import { useState } from 'react';
import { useIndexProducts } from '@/services/useProductService';
import { IProduct } from '@/intefaces/IProduct';
import { ModalProduct } from '../Modals/ModalProduct';


const getProducts = () => {
    let { isLoading, data, refetch } = useIndexProducts({});
    return {
        showData: (!isLoading && data) && true,
        products: data?.data,
        isLoading,
        refetch
    }
}

const handleDelete = (id: number) => {

}

export const TableProductList = () => {
    const [show, setShow] = useState(false);
    const closeModal = (show: boolean) => setShow(show);
    let { isLoading, products, refetch } = getProducts();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <Col md={12} className='mb-3'>
                <Button onClick={() => setShow(true)} variant="primary">
                    <i className="bi bi-plus-circle"></i> Nuevo Producto
                </Button>
            </Col>
            <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(({ id, nombre, precio, categoria_id, category }: IProduct) => {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nombre}</td>
                                    <td>{precio}</td>
                                    <td>{category?.nombre}</td>
                                    <td>
                                        <Button onClick={() => handleDelete(id)} variant='danger' className='ms-2'>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                        <Button variant='info' className='ms-2'>
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <ModalProduct
                    refetch={refetch}
                    closeModal={closeModal}
                    show={show} />
            </Col>
        </>
    )
}

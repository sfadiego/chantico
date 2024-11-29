import React, { useState } from 'react'
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { ICategory } from '@/intefaces/ICategory';

interface IOffCanvasMoreCatgoriesProps {
    categories: ICategory[],
    setactiveTab: (categoryId: number) => void,
    activeTab: number,
    selectCategory: (categoryId: number) => void,
}
export const OffCanvasMoreCatgories = ({ categories, setactiveTab, activeTab, selectCategory, ...props }: IOffCanvasMoreCatgoriesProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
        <Button onClick={handleShow} variant="light" className="h-100">
            <i className="bi bi-three-dots-vertical"></i>Ver mas
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Categorias</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup className='rounded-0'>
                    {
                        categories.map(({ nombre, id }: ICategory, key: number) =>
                            <ListGroup.Item className={`${activeTab == id ? 'bg-warning-subtle' : ''}`} onClick={() => {
                                selectCategory(id!!)
                                setactiveTab(id!!)
                            }}
                                action key={key}
                            >
                                {nombre}
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    </>
}

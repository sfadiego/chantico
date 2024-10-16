import React, { useState } from 'react'
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { ICategory } from '@/intefaces/ICategory';

export const OffCanvasMoreCatgories = ({ ...props }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { categories, selectCategory } = props;
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
                            <ListGroup.Item onClick={() => selectCategory(id)} action key={key}>{nombre}</ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    </>
}

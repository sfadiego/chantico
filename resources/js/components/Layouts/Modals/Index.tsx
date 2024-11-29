import React from 'react'
import { Button, Modal } from 'react-bootstrap';

interface CustomModalProps {
    show: boolean,
    modalTitle: string,
    children: React.ReactNode,
}

const MyModal = ({
    show,
    modalTitle,
    children
}: CustomModalProps) => {

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default MyModal
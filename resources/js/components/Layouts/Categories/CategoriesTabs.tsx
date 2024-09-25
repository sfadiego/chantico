import React from 'react'
import { Row } from 'react-bootstrap'

let categories = [
    {
        "id": 1,
        "nombre": "Cafe",
    },
    {
        "id": 2,
        "nombre": "Tisanas",
    }
];
export const CategoriesTabs = () => {
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
                        categories.map(({ id, nombre }, key) => {
                            return <div key={key} className="p-2 ms-1 border">
                                {nombre}
                            </div>
                        })
                    }
                </div>
            </div>
        </Row>
    )
}

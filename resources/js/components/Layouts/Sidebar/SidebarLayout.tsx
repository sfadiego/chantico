import React from 'react'
import { Product } from '@resources/interfaces/IProduct';
import ItemAdded from './ItemAdded';
import { TotalItem } from './TotalItem';
import ButtonComponent from '../../Button/ButtonComponent';
import { Button } from 'react-bootstrap';
import ItemDetail from './ItemDetail';
let itemsToOrder: Product[] = [
    {
        "nombre": "Pollini con salsas especiales y ",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 9,
        "activo": 1,
    },
    {
        "nombre": "Soda ",
        "precio": 40,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 1,
        "activo": 1,
    }
];

const SidebarLayout = ({ mesa }) => {
    return (
        <>
            <div className="content-wrapper d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
                <div className="d-flex text-dark text-decoration-none">
                    <span className="fs-4">{mesa}</span>
                </div>
                <hr className="mt2 mb-2" />
                <div className="mb-auto">
                    {
                        itemsToOrder.map(({ nombre, precio }, index) => <ItemAdded key={index} price={precio} label={nombre} items={5} />)
                    }
                </div>
                <ItemDetail show={false}></ItemDetail>
                <div className="d-flex text-secondary">
                    <div className="flex-fill ">
                        <ButtonComponent className="btn btn-info col-12" type='button'>
                            <i className="bi bi-printer"></i>
                        </ButtonComponent>
                    </div>
                    <div className="ps-1 flex-fill">
                        <ButtonComponent className="btn btn-warning col-12">
                            <i className="bi bi-percent"></i>
                        </ButtonComponent>
                    </div>
                </div>
                <hr className="mt-2 mb-2" />
                <TotalItem ammount={100} wrapperClass='text-secondary' label={`Subtotal`}></TotalItem>
                <TotalItem ammount={`0%`} wrapperClass='text-secondary' label={`Descuento`}></TotalItem>
                <TotalItem ammount={100} label={`Total`}></TotalItem>
                <div className="d-grid gap-2">
                    <ButtonComponent className="btn btn-success" type='button'>
                        Pagar $1100
                    </ButtonComponent>
                </div>
            </div>
            <div className="border-end b-vr calculate-height"></div>
        </>
    )
}

export default SidebarLayout;
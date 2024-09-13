import React from 'react'
import { Product } from '@resources/interfaces/IProduct';
import ItemAdded from './ItemAdded';

let itemsToOrder: Product[] = [
    {
        "nombre": "debitis",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 9,
        "activo": 1,
    },
    {
        "nombre": "Tisana",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 9,
        "activo": 1,
    },
    {
        "nombre": "debitis",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 9,
        "activo": 1,
    },
    {
        "nombre": "Tisana",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 9,
        "activo": 1,
    }
];

const SidebarLayout = () => {
    return (
        <>
            <div className="content-wrapper d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
                <div className="d-flex text-dark text-decoration-none">
                    <span className="fs-4">Mesa 11</span>
                </div>
                <hr className="mt2 mb-2" />
                <div className="mb-auto">
                    {
                        itemsToOrder.map(({ nombre }, index) => <ItemAdded key={index} name={nombre} items={1} />)
                    }

                </div>
                <hr className="mt-2 mb-2" />
                <div className="d-flex text-secondary">
                    <div className="flex-fill ">
                        <button className="btn btn-info col-12" type="button">
                            <i className="bi bi-printer"></i>
                        </button>
                    </div>
                    <div className="ps-1 flex-fill">
                        <button className="btn btn-info col-12" type="button">
                            <i className="bi bi-percent"></i>
                        </button>
                    </div>
                </div>
                <div className="d-flex text-secondary">
                    <div className="p-2 flex-grow-1 ">Subtotal </div>
                    <div className="p-2">$ 1100</div>
                </div>
                <div className="d-flex text-secondary">
                    <div className="p-2 flex-grow-1 ">Descuento </div>
                    <div className="p-2"> 0% </div>
                </div>
                <div className="d-flex">
                    <div className="p-2 flex-grow-1">Total </div>
                    <div className="p-2">$ 1100</div>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-success" type="button">
                        Pagar $1100
                    </button>
                </div>
            </div>
            <div className="border-end b-vr calculate-height"></div>
        </>
    )
}

export default SidebarLayout;
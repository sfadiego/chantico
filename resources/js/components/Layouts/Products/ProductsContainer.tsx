import React from 'react'
import { Row } from 'react-bootstrap'
import { ProductCard } from './ProductCard'
import { IProduct } from '@resources/interfaces/IProduct';

let availableItems: IProduct[] = [
    {
        "id": 1,
        "nombre": "Cafe",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit libero distinctio sed. Est aut non quas reiciendis aut itaque expedita. Facere ut aspernatur provident consequuntur. Ab delectus quia ea cupiditate.",
        "foto_id": 1,
        "categoria_id": 9,
        "activo": 1,
        "picture": {
            "id": 1,
            "nombre_archivo": "1726699406_66eb578ee380b.png",
            "url": "files/1726699406_66eb578ee380b.png",
            "created_at": "2024-09-18T22:43:33.000000Z",
            "updated_at": "2024-09-18T22:43:33.000000Z"
        }
    },
    {
        "id": 2,
        "nombre": "Soda italiana",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit libero distinctio sed. Est aut non quas reiciendis aut itaque expedita. Facere ut aspernatur provident consequuntur. Ab delectus quia ea cupiditate.",
        "foto_id": 1,
        "categoria_id": 9,
        "activo": 1,
        "picture": {
            "id": 1,
            "nombre_archivo": "1726699406_66eb578ee380b.png",
            "url": "files/1726699406_66eb578ee380b.png",
            "created_at": "2024-09-18T22:43:33.000000Z",
            "updated_at": "2024-09-18T22:43:33.000000Z"
        }
    },
];
export const ProductsContainer = () => {
    return (
        <Row className='mt-1'>
            <div className="col-12">
                <h3>Productos</h3>
            </div>
            {
                availableItems.map(({ nombre, precio, picture, foto_id }, key) => <ProductCard
                    key={key}
                    name={nombre}
                    price={precio}
                    image={foto_id ? picture : null}
                />
                )
            }
        </Row>
    )
}

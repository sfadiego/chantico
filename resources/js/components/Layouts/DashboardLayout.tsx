import React from 'react'
import { Product } from '@resources/interfaces/IProduct';
import NavBarLayout from './NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@css/dashboardLayout.css'
import SidebarLayout from './Sidebar/SidebarLayout';
import { ProductCard } from './Product/ProductCard';
import { Container, Row } from 'react-bootstrap';


let mesa = 'Mesa 1';
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
let itemsInOrder: Product[] = [
    {
        "id": 1,
        "nombre": "Pollini con salsas especiales y ",
        "precio": 42,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 9,
        "activo": 1,
    },
    {
        "id": 2,
        "nombre": "Soda ",
        "precio": 40,
        "descripcion": "Ut cumque sit suscipit.",
        "foto_id": null,
        "categoria_id": 1,
        "activo": 1,
    }
];
let availableItems: Product[] = [
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

export const DashboardLayout = () => {
    return (
        <>
            <NavBarLayout />
            <main className="d-flex flex-nowrap">
                <SidebarLayout
                    products={itemsInOrder}
                    mesa={mesa}
                />
                <Container fluid >
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
                                    categories.map(({ id, nombre }) => {
                                        return <div className="p-2 ms-1 border">
                                            {nombre}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </Row>
                    <Row className='mt-1'>
                        <div className="col-12">
                            <h3>Productos</h3>
                        </div>
                        {
                            availableItems.map(({ nombre, precio, picture, foto_id }, key) => {
                                return <ProductCard
                                    key={key}
                                    name={nombre}
                                    price={precio}
                                    image={foto_id ? picture : null}
                                />
                            })
                        }
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default DashboardLayout;
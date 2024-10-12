import React from 'react'
import { IProduct } from '@resources/interfaces/IProduct';
import NavBarLayout from './NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@css/dashboardLayout.css'
import SidebarLayout from './Sidebar/SidebarLayout';
import { Container, Row } from 'react-bootstrap';
import { CategoriesTabs } from './Categories/CategoriesTabs';
import { ProductsContainer } from './Products/ProductsContainer';
import { TakeOrderProvider } from '@/contexts/TakeOrderContext';


let mesa = 'Mesa 1';
let itemsInOrder: IProduct[] = [
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

export const TakeOrderLayout = () => {

    return (
        <TakeOrderProvider>
            <NavBarLayout />
            <main className="d-flex flex-nowrap">
                <SidebarLayout
                    products={itemsInOrder}
                    mesa={mesa}
                />
                <Container fluid >
                    <CategoriesTabs />
                    <ProductsContainer />
                </Container>
            </main>
        </TakeOrderProvider>
    )
}

export default TakeOrderLayout;
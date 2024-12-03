import { Container, Row } from 'react-bootstrap';
import { IProduct } from '@resources/interfaces/IProduct';
import NavBarLayout from '../NavBar/NavBarLayout';
import SidebarLayout from '../Sidebar/SidebarLayout';
import { CategoriesTabs } from '../Categories/CategoriesTabs';
import { ProductsContainer } from '../Products/ProductsContainer';


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
                    <CategoriesTabs />
                    <ProductsContainer />
                </Container>
            </main>
        </>
    )
}

export default DashboardLayout;
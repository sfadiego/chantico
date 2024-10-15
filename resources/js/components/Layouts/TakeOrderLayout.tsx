import React, { useEffect, useState } from 'react'
import { IProduct } from '@resources/interfaces/IProduct';
import NavBarLayout from './NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@css/dashboardLayout.css'
import SidebarLayout from './Sidebar/SidebarLayout';
import { Container, Row } from 'react-bootstrap';
import { CategoriesTabs } from './Categories/CategoriesTabs';
import { ProductsContainer } from './Products/ProductsContainer';
import { useShowOrder } from '@/services/useOrderService';
import useGetOrderDetail from '@/hooks/useOrderDetail';
import LoadingComponent from './LoadingComponent';

export const TakeOrderLayout = ({ currentOrderId }: { currentOrderId?: number }) => {
    const [categoryId, setCategoryId] = useState<number>(0);
    const selectCategory = (categoryId: number) => setCategoryId(categoryId);
    const { isLoading, showData, order, productsInOrder } = useGetOrderDetail(1);//useShowOrder(currentOrderId)
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    // console.log(isLoading, showData, order, productInOrder);
    const { nombre_pedido } = order

    return (
        <>
            <NavBarLayout />
            <main className="d-flex flex-nowrap">
                <SidebarLayout
                    productsInOrder={productsInOrder}
                    mesa={nombre_pedido}
                />
                <Container fluid >
                    <CategoriesTabs selectCategory={selectCategory} />
                    <ProductsContainer categoryId={categoryId} />
                </Container>
            </main>
        </>
    )
}

export default TakeOrderLayout;
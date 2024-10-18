import React, { useEffect, useState } from 'react'
import NavBarLayout from './NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@css/dashboardLayout.css'
import SidebarLayout from './Sidebar/SidebarLayout';
import { Container, Row } from 'react-bootstrap';
import { CategoriesTabs } from './Categories/CategoriesTabs';
import { ProductsContainer } from './Products/ProductsContainer';
import useGetOrderDetail from '@/hooks/useOrderDetail';
import LoadingComponent from './LoadingComponent';

export const TakeOrderLayout = ({ currentOrderId = 1 }: { currentOrderId?: number }) => {
    const [categoryId, setCategoryId] = useState<number>(0);
    const [productName, setSearchProduct] = useState<string>('');
    const [activeTab, setactiveTab] = useState(0)
    const selectCategory = (categoryId: number) => setCategoryId(categoryId);
    //TODO: remplazar order id -> useShowOrder(currentOrderId)
    const { isLoading, order, productsInOrder } = useGetOrderDetail(currentOrderId);
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <NavBarLayout setSearchProduct={setSearchProduct} />
            <main className="d-flex flex-nowrap">
                <SidebarLayout
                    productsInOrder={productsInOrder}
                    order={order}
                />
                <Container fluid >
                    <CategoriesTabs activeTab={activeTab} setactiveTab={setactiveTab} selectCategory={selectCategory} />
                    <ProductsContainer
                        productName={productName}
                        currentOrderId={currentOrderId}
                        categoryId={categoryId} />
                </Container>
            </main>
        </>
    )
}

export default TakeOrderLayout;
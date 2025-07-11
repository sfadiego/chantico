import React from 'react';
import { useState } from 'react'
import NavBarLayout from './NavBar/NavBarLayout';
import SidebarLayout from './Sidebar/SidebarLayout';
import { Container, Row } from 'react-bootstrap';
import { CategoriesTabs } from './Categories/CategoriesTabs';
import { ProductsContainer } from './Products/ProductsContainer';
import useGetOrderDetail from '@/hooks/useOrderDetail';
import LoadingComponent from './LoadingComponent';
import { useParams } from 'react-router-dom';
import { NavBarOptionContainer } from './NavBar/NavBarOptionContainer';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { NavBarOptions } from './NavBar/NavBarOption';
import { RoutesUser } from '@/router/modules/users.routes';

export const TakeOrder = () => {
    const { id } = useParams();
    if (!id) {
        return <LoadingComponent></LoadingComponent>;
    }
    const orderId = parseInt(id);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [productName, setSearchProduct] = useState<string>('');
    const [activeTab, setactiveTab] = useState(0)
    const selectCategory = (categoryId: number) => setCategoryId(categoryId);
    const { isLoading, order, productsInOrder, refetch } = useGetOrderDetail(orderId);
    if (isLoading || !order) return <LoadingComponent></LoadingComponent>;
    const { estatus_pedido_id } = order;
    return (
        <>
            <NavBarLayout >
                <NavBarOptionContainer>
                    <NavBarOptions label="Ventas" href={RoutesUser.OrderList} />
                </NavBarOptionContainer>
                <form className="col-md-3" role="search">
                    <input className="form-control" type="search"
                        onChange={(e) => setSearchProduct(e.target.value)}
                        placeholder="Buscar productos" aria-label="Search" />
                </form>
            </NavBarLayout>
            <main className="d-flex flex-nowrap">
                <SidebarLayout
                    productsInOrder={productsInOrder}
                    order={order}
                    refetch={refetch}
                />
                <Container fluid >
                    <CategoriesTabs activeTab={activeTab} setactiveTab={setactiveTab} selectCategory={selectCategory} />
                    {
                        estatus_pedido_id == OrderStatusEnum.InProcess &&
                        < ProductsContainer
                            refetch={refetch}
                            productName={productName}
                            currentOrderId={orderId}
                            categoryId={categoryId}
                        />
                    }
                </Container>
            </main>
        </>
    )
}

export default TakeOrder;
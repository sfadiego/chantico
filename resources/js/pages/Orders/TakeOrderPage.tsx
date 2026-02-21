import React from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import useGetOrderDetail from "@/hooks/useOrderDetail";
import { useParams } from "react-router-dom";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { AdminRoutes } from "@/router/modules/admin.routes";
import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import SidebarLayout from "@/Layouts/Sidebar/SidebarLayout";
import { CategoriesTabs } from "@/Layouts/Categories/CategoriesTabs";
import { ProductsContainer } from "@/Layouts/Products/ProductsContainer";
import LoadingComponent from "@/Layouts/LoadingComponent";

export default function TakeOrderPage() {
    const { id } = useParams();
    if (!id) {
        return <LoadingComponent />;
    }
    const orderId = parseInt(id);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [productName, setSearchProduct] = useState<string>("");
    const [activeTab, setactiveTab] = useState(0);
    const selectCategory = (categoryId: number) => setCategoryId(categoryId);
    const { isLoading, order, productsInOrder, refetch } =
        useGetOrderDetail(orderId);
    if (isLoading || !order) return <LoadingComponent />;
    const { estatus_pedido_id } = order;
    return (
        <>
            <NavBarLayout>
                <NavBarOptionContainer>
                    <NavBarOptions
                        label="Ventas"
                        href={AdminRoutes.OrderList}
                    />
                </NavBarOptionContainer>
                <form className="col-md-3" role="search">
                    <input
                        className="form-control"
                        type="search"
                        onChange={(e) => setSearchProduct(e.target.value)}
                        placeholder="Buscar productos"
                        aria-label="Search"
                    />
                </form>
            </NavBarLayout>
            <main className="d-flex flex-nowrap">
                <SidebarLayout
                    productsInOrder={productsInOrder}
                    order={order}
                    refetch={refetch}
                />
                <Container fluid>
                    <CategoriesTabs
                        activeTab={activeTab}
                        setactiveTab={setactiveTab}
                        selectCategory={selectCategory}
                    />
                    {estatus_pedido_id == OrderStatusEnum.InProcess && (
                        <ProductsContainer
                            refetch={refetch}
                            productName={productName}
                            currentOrderId={orderId}
                            categoryId={categoryId}
                        />
                    )}
                </Container>
            </main>
        </>
    );
}

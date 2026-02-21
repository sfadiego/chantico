import React, { useState } from "react";
import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { Row } from "react-bootstrap";
import { TableProductList } from "@/Layouts/Tables/TableProductList";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import { AdminRoutes } from "@/router/modules/admin.routes";

const ProductsPage = () => {
    const [productName, setSearchProduct] = useState<string>("");
    return (
        <>
            <NavBarLayout>
                <NavBarOptionContainer>
                    <NavBarOptions
                        label="Productos"
                        href={AdminRoutes.ProductsPage}
                    />
                    <NavBarOptions
                        label="Categorías"
                        href={AdminRoutes.CategoryList}
                    />
                    <NavBarOptions
                        label="Estadísticas"
                        href={AdminRoutes.Statistics}
                    />
                    <NavBarOptions label="Ventas" href={AdminRoutes.SaleList} />
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
            <main className="container-fluid p-4">
                <Row>
                    <TableProductList search={productName} />
                </Row>
            </main>
        </>
    );
};

export default ProductsPage;

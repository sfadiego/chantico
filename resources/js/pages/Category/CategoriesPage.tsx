import { Row } from "react-bootstrap";
import { AdminRoutes } from "@/router/modules/admin.routes";
import { useState } from "react";
import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import { TableCategoryList } from "@/Layouts/Tables/TableCategoryList";

const CategoriesPage = () => {
    const [categoryName, setSearchCategory] = useState<string>("");
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
                        onChange={(e) => setSearchCategory(e.target.value)}
                        placeholder="Buscar categoria"
                        aria-label="Search"
                    />
                </form>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <Row>
                    <TableCategoryList search={categoryName} />
                </Row>
            </main>
        </>
    );
};
export default CategoriesPage;

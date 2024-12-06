import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/components/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/components/Layouts/NavBar/NavBarOptionContainer";
import { WidgetLayout } from "@/components/Layouts/Widgets/WidgetLayout";
import { RoutesAdmin } from "@/router/modules/admin.routes";
import { Row } from "react-bootstrap";
import OpenSales from "./Sales/OpenSalesLayout";

const Dashboard = () => {
    return (
        <>
            <NavBarLayout >
                <NavBarOptionContainer>
                    <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
                    <NavBarOptions label="Categorias" href={RoutesAdmin.CategoryList} />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <WidgetLayout />
                {/* <OpenSales /> */}

            </main>
        </>
    )
}
export default Dashboard;

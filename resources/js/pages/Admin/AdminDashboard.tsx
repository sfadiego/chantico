import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/components/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/components/Layouts/NavBar/NavBarOptionContainer";
import { DashboardWidgets } from "@/components/Layouts/Widgets/dashboardWidgets";
import { RoutesAdmin } from "@/router/modules/admin.routes";

const AdminDashboard = () => {
    return (
        <>
            <NavBarLayout >
                <NavBarOptionContainer>
                    <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
                    <NavBarOptions label="Categorias" href={RoutesAdmin.CategoryList} />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <DashboardWidgets />
            </main>
        </>
    )
}
export default AdminDashboard;

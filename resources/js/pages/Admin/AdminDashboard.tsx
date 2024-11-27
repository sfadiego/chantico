import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/components/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/components/Layouts/NavBar/NavBarOptionContainer";
import { DashboardWidgets } from "@/components/Layouts/Widgets/dashboardWidgets";

const AdminDashboard = () => {
    return (
        <>
            <NavBarLayout >
                <NavBarOptionContainer>
                    <NavBarOptions label="Productos" href="/admin/product-list" />
                    <NavBarOptions label="Categorias" href="/admin/categories" />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <DashboardWidgets />
            </main>
        </>
    )
}
export default AdminDashboard;

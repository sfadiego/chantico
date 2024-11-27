import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { DashboardWidgets } from "@/components/Layouts/Widgets/dashboardWidgets";

const AdminDashboard = () => {
    return (
        <>
            <NavBarLayout ></NavBarLayout>
            <main className="container-fluid p-4">
                <DashboardWidgets/>
            </main>
        </>
    )
}
export default AdminDashboard;

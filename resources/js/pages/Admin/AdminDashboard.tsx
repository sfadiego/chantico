import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { DashboardWidgets } from "@/components/Layouts/Widgets/dashboardWidgets";
import { WidgetsLayout } from "@/components/Layouts/Widgets/WidgetsLayout";
import { Button, Card, Col, Row } from "react-bootstrap";

const AdminDashboard = () => {
    return (
        <>
            <NavBarLayout ></NavBarLayout>
            <main className="container-fluid p-4">
                <DashboardWidgets/>
                <WidgetsLayout />
            </main>
        </>
    )
}
export default AdminDashboard;

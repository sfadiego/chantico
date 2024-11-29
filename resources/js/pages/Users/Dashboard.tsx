import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { WidgetsLayout } from "@/components/Layouts/Widgets/WidgetsLayout";
import { Row } from "react-bootstrap";

const Dashboard = () => {
    return (
        <>
            <NavBarLayout ></NavBarLayout>
            <main className="container-fluid p-4">
                <WidgetsLayout />
            </main>
        </>
    )
}
export default Dashboard;

import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { WidgetLayout } from "@/components/Layouts/Widgets/WidgetLayout";

const Dashboard = () => {
    return (
        <>
            <NavBarLayout ></NavBarLayout>
            <main className="container-fluid p-4">
                <WidgetLayout />
            </main>
        </>
    )
}
export default Dashboard;

import LoadingComponent from "@/components/Layouts/LoadingComponent";
import NavBarLayout from "@/components/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/components/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/components/Layouts/NavBar/NavBarOptionContainer";
import { useActiveSale } from "@/components/Layouts/Sales/hooks/useActiveSale";
import { WidgetLayout } from "@/components/Layouts/Widgets/WidgetLayout";
import { useAxios } from "@/hooks/useAxios";
import { RoutesAdmin } from "@/router/modules/admin.routes";
import { useEffect } from "react";

const Dashboard = () => {
    const { isLoading, showData, info, refetch } = useActiveSale();
    const {  setSistema } = useAxios();
    if (isLoading && showData) return <LoadingComponent />;
    useEffect(() => {
        if (info) {
            setSistema(info.id)
        }
    }, [info])

    return (
        <>
            <NavBarLayout >
                <NavBarOptionContainer>
                    <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
                    <NavBarOptions label="Categorias" href={RoutesAdmin.CategoryList} />
                    <NavBarOptions label="Estadisticas" href={RoutesAdmin.Statistics} />
                    <NavBarOptions label="Ventas" href={RoutesAdmin.SaleList} />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <WidgetLayout />
            </main>
        </>
    )
}
export default Dashboard;

import React, { useEffect } from "react";
import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { WidgetLayout } from "@/Layouts/Widgets/WidgetLayout";
import LoadingComponent from "@/Layouts/LoadingComponent";
import { useAxios } from "@/hooks/useAxios";
import { useGetActiveSale } from "@/services/useOpenSalesService";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import { AdminRoutes } from "@/router/modules/admin.routes";

export default function DashboardPage() {
    const { isLoading, data, refetch } = useGetActiveSale();
    const info = !isLoading && data?.data;
    const { setSistema } = useAxios();
    if (isLoading && !data) return <LoadingComponent />;
    // console.log(isLoading, data?.data);
    // useEffect(() => {
    //     if (data?.id) {
    //         setSistema(data.id);
    //     }
    // }, [data]);
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
            </NavBarLayout>
            <main className="container-fluid p-4">
                <WidgetLayout />
            </main>
        </>
    );
}

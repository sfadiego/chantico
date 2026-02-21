import LoadingComponent from "../LoadingComponent";
import moment from "moment";
import { Widget } from "../Widgets/Widget";
import { NavLink } from "react-router-dom";
import { AdminRoutes } from "@/router/modules/admin.routes";
import { useGetActiveSale } from "@/services/useOpenSalesService";

export const ActiveSale = () => {
    let { isLoading, data } = useGetActiveSale();
    if (isLoading && !data) return <LoadingComponent />;
    const date = data?.created_at
        ? moment(data.created_at).format("MMMM Do YYYY")
        : " -- ";

    const props = {
        cardTitle: `Venta Activa`,
        description: `Existe una venta abierta el dia ${date}`,
        children: (
            <>
                <NavLink to={AdminRoutes.CloseSales}>Cerrar Caja</NavLink>
            </>
        ),
    };
    return <Widget {...props} />;
};

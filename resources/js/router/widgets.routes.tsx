import { lazy } from "react";
import { NavLink } from "react-router-dom";
import ImgBebida from '@assets/bebida.png'
import ImgChantico from '@assets/logo_chantico_sm.png'
import ImgEnsalada from '@assets/ensalada.png'
import { RoutesUser } from "./modules/users.routes";
import { RoutesAdmin } from "./modules/admin.routes";


//REGLAS DE NEGOCIO: validar si es admin,
//si se muestra para cliente y admin, 
//si se va a mostrar, etc.
const hasPermissions = () => {
    return true
}

// const OpenSalesLayout = lazy(() => import('../components/Layouts/Sales/OpenSalesLayout'));
const UserDashboardRoutes = [
    {
        cardTitle: 'Ordenes',
        description: 'Listado de ordenes',
        image: ImgBebida,
        admin: false,
        size: 3,
        children: <>
            <NavLink to={RoutesUser.OrderList} end> Ir a listado </NavLink>
        </>
    }
];

export const OpenSalesWidgetRoute = {
    cardTitle: 'Abrir Caja',
    description: 'Ir a abrir caja para iniciar ventas',
    admin: true,
    image: ImgChantico,
    validationShow: hasPermissions(),
    size: 3,
    children: <>
        <NavLink to={RoutesAdmin.OpenSales} end> Abrir Caja </NavLink>
    </>

};

const AdminDashboardRoutes = [
    {
        cardTitle: 'Mas vendido',
        description: 'Producto mas vendido',
        admin: true,
        image: ImgEnsalada,
        validationShow: hasPermissions(),
        size: 3,
        children: <>
            <b>Pollini</b>
        </>
    }
];

const dashboardWidgetRoutes = [
    ...UserDashboardRoutes,
    ...AdminDashboardRoutes,
];

export default dashboardWidgetRoutes;
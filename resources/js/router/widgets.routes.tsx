import { NavLink } from "react-router-dom";

//REGLAS DE NEGOCIO: validar si es admin,
//si se muestra para cliente y admin, 
//si se va a mostrar, etc.
const validationShow = () => {
    return true;
}

const UserDashboardRoutes = [
    {
        cardTitle: 'Ordenes',
        cardHeader: 'Listado de ordenes',
        admin: false,
        size: 3,
        children: <>
            <NavLink className={`btn btn-primary`} to='/order-list' end> {`Listado de ordenes`}</NavLink>
        </>
    }
];

const AdminDashboardRoutes = [
    {
        cardTitle: 'Abrir Caja',
        cardHeader: 'Ir a abrir caja para iniciar ventas',
        admin: true,
        validationShow: validationShow(),
        size: 3,
        children: <>
            <NavLink className={`btn btn-primary`} to='/admin/open-sales' end> Abrir Caja</NavLink>
        </>
    },
];

const dashboardWidgetRoutes = [
    ...UserDashboardRoutes,
    ...AdminDashboardRoutes,
];

export default dashboardWidgetRoutes;
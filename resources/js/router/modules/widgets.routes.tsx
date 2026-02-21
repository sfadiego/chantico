import { NavLink } from "react-router-dom";
import ImgBebida from "@assets/bebida.png";
import ImgChantico from "@assets/logo_chantico_sm.png";
import ImgEnsalada from "@assets/ensalada.png";
import { AdminRoutes } from "./admin.routes";
import { RoleEnum } from "@/enums/RoleEnum";

const allWidgets = [
    {
        cardTitle: "Abrir Caja",
        description: "Ir a abrir caja para iniciar ventas",
        role: [RoleEnum.Admin],
        usedWhenClosedSales: true,
        image: ImgChantico,
        children: (
            <>
                <NavLink to={AdminRoutes.OpenSales} end>
                    Abrir Caja
                </NavLink>
            </>
        ),
    },
    {
        cardTitle: "Cerrar Ventas",
        description: "Cerrar ventas y ver resumen del dia",
        role: [RoleEnum.Admin],
        usedWhenClosedSales: false,
        image: ImgEnsalada,
        children: (
            <>
                <NavLink to={AdminRoutes.CloseSales} end>
                    Ir a cerrar caja
                </NavLink>
            </>
        ),
    },
    {
        cardTitle: "Ordenes",
        description: "Listado de ordenes",
        image: ImgBebida,
        usedWhenClosedSales: false,
        role: [RoleEnum.Employe, RoleEnum.Admin],
        children: (
            <>
                <NavLink to={AdminRoutes.OrderList} end>
                    Ir a listado
                </NavLink>
            </>
        ),
    },
];

export default allWidgets;

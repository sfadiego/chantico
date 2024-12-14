import LoadingComponent from '../LoadingComponent';
import moment from 'moment';
import { Widget } from '../Widgets/Widget';
import { NavLink } from 'react-router-dom';
import { RoutesAdmin } from '@/router/modules/admin.routes';
import { useActiveSale } from './hooks/useActiveSale';



export const ActiveSale = () => {
    let { isLoading, showData, info, refetch } = useActiveSale();
    if (isLoading && showData) return <LoadingComponent />;
    const date = info?.created_at ? moment(info.created_at).format("MMMM Do YYYY") : ' -- ';
    const props = {
        cardTitle: `Venta Activa`,
        description: `Existe una venta abierta el dia ${date}`,
        children: <>
            <NavLink to={RoutesAdmin.CloseSales} end> Cerrar Caja </NavLink>
        </>
    };
    return (
        <Widget {...props} />
    )
}

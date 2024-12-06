import { useGetActiveSale } from '@/services/useOpenSalesService';
import React, { Children } from 'react'
import LoadingComponent from '../LoadingComponent';
import moment from 'moment';
import { Widget } from '../Widgets/Widget';
import { NavLink } from 'react-router-dom';
import { RoutesAdmin } from '@/router/modules/admin.routes';


const getActive = () => {
    let { isLoading, data, refetch } = useGetActiveSale();
    return {
        showData: (!isLoading && data) && true,
        info: data?.data,
        isLoading,
        refetch
    }
}

export const ActiveSale = () => {
    let { isLoading, info, refetch } = getActive();
    if (isLoading) return <LoadingComponent></LoadingComponent>;
    console.log(info);
    const date = moment(info.created_at).format("ll");
    // const description = 
    const props = {
        cardTitle: `Venta Activa`,
        description: `Existe una venta abierta el dia ${date}`,
        children: <>
            <NavLink to={RoutesAdmin.OpenSales} end> Abrir Caja </NavLink>
        </>
    };
    return (
        <Widget {...props} />
    )
}

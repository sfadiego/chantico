import { IUser } from '@/intefaces/IUser';
import { RoleEnum } from '../../enums/RoleEnum'
import { lazy } from 'react';

const TakeOrder = lazy(() => import('@/pages/TakeOrder'));

export enum RoutesAdmin {
    Dashboard = '/admin/dashboard',
    NewProduct = '/admin/new-products',
    ProductList = '/admin/product-list',
    CloseSales = '/admin/close-sales',
    SalesSummary = '/admin/sales-summary',
    OrderList = '/admin/order-list',
    TakeOrder = '/admin/take-order',
}

const hasPermission = ({ rol_id }: IUser) => {
    return (rol_id === RoleEnum.Admin);
}

export const AdminRoutes = [
    {
        path: RoutesAdmin.TakeOrder,
        element: <TakeOrder />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
];
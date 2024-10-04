import { IUser } from '@/intefaces/IUser';
import { RoleEnum } from '../../enums/RoleEnum'
import Dashboard from '@resources/pages/Auth/Register';
import UserDashboard from '../../pages/Users/index';

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
        path: RoutesAdmin.Dashboard,
        element: <Dashboard />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.TakeOrder,
        element: <UserDashboard />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
];
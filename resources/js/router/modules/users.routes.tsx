import { lazy } from 'react';
import { RoleEnum } from '@/enums/RoleEnum';
import { IUser } from '@/intefaces/IUser';
import OrderList from '@/pages/OrderList';
import TakeOrderLayoutTemp from '@/pages/TakeOrderLayoutTemp';


export enum RoutesUser {
    Dashboard = '/user/dashboard',
    TakeOrder = '/take-order/:id',
    OrderList = '/order-list',
}
const UserDashboard = lazy(() => import('@/pages/Users/Dashboard'))
const hasPermission = ({ rol_id }: IUser) => {
    return (rol_id === RoleEnum.Employe);
}

export const UserRoutes = [
    {
        path: RoutesUser.Dashboard,
        element: <UserDashboard />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesUser.TakeOrder,
        element: <TakeOrderLayoutTemp />,
        private: false,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesUser.OrderList,
        element: <OrderList />,
        private: true,
        hasPermission: (user: IUser) => true
    },
];
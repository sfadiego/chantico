import { lazy } from 'react';
import { RoleEnum } from '@/enums/RoleEnum';
import { IUser } from '@/intefaces/IUser';
import TakeOrder from '@/pages/TakeOrder';
import OrderList from '@/pages/OrderList';


export enum RoutesUser {
    Dashboard = '/dashboard',
    TakeOrder = '/take-order/:id',
    OrderList = '/order-list',
}
const UserDashboard = lazy(() => import('@/pages/Users/index'))
// const TakeOrder = lazy(() => import('@/pages/TakeOrder'))
// const OrderList = lazy(() => import('@/pages/OrderList'))

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
        element: <TakeOrder/>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesUser.OrderList,
        element: <OrderList />,
        private: true,
        hasPermission: (user: IUser) => true
    },
];
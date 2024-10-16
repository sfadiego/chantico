import { lazy } from 'react';
import { RoleEnum } from '@/enums/RoleEnum';
import { IUser } from '@/intefaces/IUser';

export enum RoutesUser {
    UserDashboard = '/user/dashboard',
    OrderList = '/user/order-list',
    TakeOrder = '/user/take-order',
}
const UserDashboard = lazy(() => import('@/pages/Users/index'))

const hasPermission = ({ rol_id }: IUser) => {
    return (rol_id === RoleEnum.Employe);
}

export const UserRoutes = [
    {
        path: RoutesUser.UserDashboard,
        element: <UserDashboard />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    }
];
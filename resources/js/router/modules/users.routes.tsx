import { RoleEnum } from '@/enums/RoleEnum';
import UserDashboard from '../../pages/Users/index';
import { IUser } from '@/intefaces/IUser';

export enum RoutesUser {
    OrderList = '/user/order-list',
    TakeOrder = '/user/take-order',
}
const hasPermission = ({ rol_id }: IUser) => {
    return (rol_id === RoleEnum.Employe);
}

export const UserRoutes = [
    {
        path: "/user/dashboard",
        element: <UserDashboard />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    }
];
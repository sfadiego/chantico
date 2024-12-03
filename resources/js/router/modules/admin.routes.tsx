import { lazy } from 'react';
import { IUser } from '@/intefaces/IUser';
import { RoleEnum } from '../../enums/RoleEnum'
import TakeOrder from '@/pages/TakeOrder';
import { ProductList } from '@/components/Layouts/Products/ProductList';
import { UpdateProduct } from '@/pages/Admin/Product/UpdateProduct';
import { CategoryList } from '@/components/Layouts/Categories/CategoryList';

const AdminDashboard = lazy(() => import('@/pages/Admin/index'));
export enum RoutesAdmin {
    Dashboard = '/admin/dashboard',
    TakeOrder = '/take-order/:id',
    ProductList = '/admin/product-list',
    Product = '/admin/product/:id',
    CategoryList = '/admin/category-list',
    Category = '/admin/category/:id',
    OpenCloseSales = '/admin/open-sales',
    SalesSummary = '/admin/sales-summary',
}

const hasPermission = ({ rol_id }: IUser) => {
    return (rol_id === RoleEnum.Admin);
}

export const AdminRoutes = [
    {
        path: RoutesAdmin.Dashboard,
        element: <AdminDashboard />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.TakeOrder,
        element: <TakeOrder />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.Product,
        element: <UpdateProduct/>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.ProductList,
        element: <ProductList/>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.CategoryList,
        element: <CategoryList/>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.OpenCloseSales,
        element: <>Open/Close Sales</>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.SalesSummary,
        element: <>Sales Summary</>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
];
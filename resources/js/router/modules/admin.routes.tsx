import { lazy } from 'react';
import { IUser } from '@/intefaces/IUser';
import { RoleEnum } from '../../enums/RoleEnum'
import { UpdateCategoryLayout } from '@/pages/Admin/Category/UpdateCategoryLayout';
import { UpdateProductLayout } from '@/pages/Admin/Product/UpdateProductLayout';
import OpenSalesLayout from '@/pages/Admin/Sales/OpenSalesLayout';
import { StatisticsLayout } from '@/pages/Admin/Statistics/StatisticsLayout';
import { SalesSummaryLayout } from '@/pages/Admin/Sales/SalesSummaryLayout';
import CloseSalesLayout from '@/pages/Admin/Sales/CloseSalesLayout';
import { CategoryList } from '@/pages/Admin/Category/CategoryList';
import { ProductList } from '@/pages/Admin/Product/ProductList';
import TakeOrderLayoutTemp from '@/pages/TakeOrderLayoutTemp';

const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
export enum RoutesAdmin {
    Dashboard = '/admin/dashboard',
    TakeOrder = '/take-order/:id',
    ProductList = '/admin/product-list',
    Product = '/admin/product/:id',
    CategoryList = '/admin/category-list',
    Category = '/admin/category/:id',
    OpenSales = '/admin/open-sales',
    CloseSales = '/admin/close-sales',
    SalesSummary = '/admin/sales-summary/:id',
    Statistics = '/admin/statistics',
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
        element: <TakeOrderLayoutTemp />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.Product,
        element: <UpdateProductLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.ProductList,
        element: <ProductList />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.CategoryList,
        element: <CategoryList />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.Category,
        element: <UpdateCategoryLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.OpenSales,
        element: <OpenSalesLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.CloseSales,
        element: <CloseSalesLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.SalesSummary,
        element: <SalesSummaryLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
    {
        path: RoutesAdmin.Statistics,
        element: <StatisticsLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
];
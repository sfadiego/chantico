import { lazy } from 'react';
import { IUser } from '@/intefaces/IUser';
import { RoleEnum } from '../../enums/RoleEnum'
import { UpdateCategoryLayout } from '@/pages/Admin/Category/UpdateCategoryLayout';
import { UpdateProductLayout } from '@/pages/Admin/Product/UpdateProductLayout';

const OpenSalesLayout = lazy(() => import('@/pages/Admin/Sales/OpenSalesLayout'));
const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const CategoryList = lazy(() => import('@/pages/Admin/Category/CategoryList'));
const ProductList = lazy(() => import('@/pages/Admin/Product/ProductList'));
const TakeOrderLayout = lazy(() => import('@/pages/TakeOrderLayout'));
const CloseSalesLayout = lazy(() => import('@/pages/Admin/Sales/CloseSalesLayout'));
const SalesSummaryLayout = lazy(() => import('@/pages/Admin/Sales/SalesSummaryLayout'));
const StatisticsLayout = lazy(() => import('@/pages/Admin/Statistics/StatisticsLayout'));
const SaleListLayout = lazy(() => import('@/pages/Admin/Sales/SaleListLayout'));

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
    SaleList = '/admin/sale-list',
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
        element: <TakeOrderLayout />,
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
    {
        path: RoutesAdmin.SaleList,
        element: <SaleListLayout />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
];
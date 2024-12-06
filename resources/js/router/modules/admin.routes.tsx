import { lazy } from 'react';
import { IUser } from '@/intefaces/IUser';
import { RoleEnum } from '../../enums/RoleEnum'
import TakeOrder from '@/pages/TakeOrder';
import { ProductList } from '@/components/Layouts/Products/ProductList';
import { CategoryList } from '@/components/Layouts/Categories/CategoryList';
import { UpdateCategoryLayout } from '@/pages/Admin/Category/UpdateCategoryLayout';
import { UpdateProductLayout } from '@/pages/Admin/Product/UpdateProductLayout';
import OpenSalesLayout from '@/pages/Admin/Sales/OpenSalesLayout';

const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
export enum RoutesAdmin {
    Dashboard = '/admin/dashboard',
    TakeOrder = '/take-order/:id',
    ProductList = '/admin/product-list',
    Product = '/admin/product/:id',
    CategoryList = '/admin/category-list',
    Category = '/admin/category/:id',
    OpenSales = '/admin/open-sales',
    SalesSummary = '/admin/sales-summary',
}

/**
 * 
 * Validar si ya se abrio las ventas
 *  si - redirige a el dashboard
 *  no - redirige a abrir ventas o widget
 * Validar si tiene permiso como administrador o usuario
 *
 */
const hasPermission = ({ rol_id }: IUser) => {
    return (rol_id === RoleEnum.Admin);
}

// const hasActiveSales = (sistemaId: number | null) => {
//     return (sistemaId);
// }

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
        path: RoutesAdmin.SalesSummary,
        element: <>Sales Summary</>,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user)
    },
];
import { lazy } from "react";
import { RoleEnum } from "../../enums/RoleEnum";
import { IUser } from "@/models/IUser";
import IRoute from "@/intefaces/IRoutes";

const DashboardPage = lazy(() => import("@/pages/Dashboard/DashboardPage")); //TODO: ajustar a dashbardPage
const OpenSalesPage = lazy(
    () => import("@/pages/Sales/partials/OpenSales/OpenSalesPage"),
);
const CloseSalesPage = lazy(
    () => import("@/pages/Sales/partials/CloseSales/CloseSalesPage"),
);
const CategoriesPage = lazy(() => import("@/pages/Category/CategoriesPage"));
const UpdateCategoryPage = lazy(
    () => import("@/pages/Category/UpdateCategoryPage"),
);
const ProductsPage = lazy(() => import("@/pages/Product/ProductsPage"));
const UpdateProductPage = lazy(
    () => import("@/pages/Product/UpdateProductPage"),
);

const OrderListPage = lazy(() => import("@/pages/Orders/OrderListPage"));
const TakeOrderPage = lazy(() => import("@/pages/Orders/TakeOrderPage"));
const SalesSummaryPage = lazy(
    () => import("@/pages/Sales/partials/SalesSummary/SalesSummaryPage"),
);
const StatisticsPage = lazy(() => import("@/pages/Statistics/StatisticsPage"));
const SalesListPage = lazy(
    () => import("@/pages/Sales/partials/SalesList/SalesListPage"),
);

export enum AdminRoutes {
    Dashboard = "/",
    OpenSales = "/admin/open-sales",
    CloseSales = "/admin/close-sales",
    ProductsPage = "/admin/product-list",
    SalesSummary = "/admin/sales-summary/:id",
    OrderList = "/order-list",
    TakeOrder = "/take-order/:id",
    Product = "/admin/product/:id",
    CategoryList = "/admin/category-list",
    Category = "/admin/category/:id",
    Statistics = "/admin/statistics",
    SaleList = "/admin/sale-list",
}

const hasPermission = ({ rol_id }: IUser) => {
    return rol_id === RoleEnum.Admin;
};

export const adminRoutes: IRoute[] = [
    {
        path: AdminRoutes.Dashboard,
        element: <DashboardPage />,
        private: true,
    },
    {
        path: AdminRoutes.TakeOrder,
        element: <TakeOrderPage />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.Product,
        element: <UpdateProductPage />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.ProductsPage,
        element: <ProductsPage />,
        private: true,
        // hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.CategoryList,
        element: <CategoriesPage />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.Category,
        element: <UpdateCategoryPage />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.OpenSales,
        element: <OpenSalesPage />,
        private: true,
        // hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.CloseSales,
        element: <CloseSalesPage />,
        private: true,
        // hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.SalesSummary,
        element: <SalesSummaryPage />,
        private: true,
        // hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.Statistics,
        element: <StatisticsPage />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.SaleList,
        element: <SalesListPage />,
        private: true,
        hasPermission: (user: IUser) => hasPermission(user),
    },
    {
        path: AdminRoutes.OrderList,
        element: <OrderListPage />,
        private: true,
        // hasPermission: (user: IUser) => true,
    },
];

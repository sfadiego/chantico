import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import IRoute from "@/intefaces/IRoutes";
import OrderListPage from "@/pages/Orders/OrderListPage";
import ProductsPage from "@/pages/Product/ProductsPage";
import CategoriesPage from "@/pages/Category/CategoriesPage";

const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const TenantLoginPage = lazy(() => import("@/pages/Auth/TenantLoginPage"));
const DashboardPage = lazy(() => import("@/pages/Dashboard/DashboardPage"));
const TakeOrderPage = lazy(() => import("@/pages/Orders/TakeOrderPage"));
const CloseSalesPage = lazy(() => import("@/pages/Sales/partials/CloseSales/CloseSalesPage"));
const SalesPage = lazy(() => import("@/pages/Sales/SalesPage"));
const StatisticsPage = lazy(() => import("@/pages/Statistics/StatisticsPage"));
const AdminPage = lazy(() => import("@/pages/Admin/AdminPage"));

const PageLoader = () => (
    <div className="flex items-center justify-center h-full min-h-32">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
);

const FullPageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
);

const withPrivateLayout = (element: React.ReactElement, route: IRoute) => (
    <AppLayout>
        <PrivateRoute
            element={<Suspense fallback={<PageLoader />}>{element}</Suspense>}
            route={route}
        />
    </AppLayout>
);

const privateRoutes: IRoute[] = [
    { path: "/", element: <DashboardPage />, private: true },
    { path: "/orders", element: <OrderListPage />, private: true },
    { path: "/products", element: <ProductsPage />, private: true },
    { path: "/categories", element: <CategoriesPage />, private: true },
    { path: "/take-order/:id", element: <TakeOrderPage />, private: true },
    { path: "/close-sales", element: <CloseSalesPage />, private: true },
    { path: "/sales", element: <SalesPage />, private: true },
    { path: "/statistics", element: <StatisticsPage />, private: true },
    { path: "/admin", element: <AdminPage />, private: true },
];

export const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Suspense fallback={<FullPageLoader />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/:slug/login",
        element: (
            <Suspense fallback={<FullPageLoader />}>
                <TenantLoginPage />
            </Suspense>
        ),
    },
    ...privateRoutes.map((route) => ({
        path: route.path,
        element: withPrivateLayout(route.element, route),
    })),
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

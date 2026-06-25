import { Widget } from "@/components/dashboard/widgets/Widget";
import { SubscriptionBanner } from "@/components/dashboard/SubscriptionBanner";
import {
    Award, ShoppingCart, Package, Landmark,
    Plus, Lock, Unlock, LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "./useDashboard";
import { RecentOrders } from "./partials/RecentOrders";
import { NewOrderModal } from "@/components/orders/NewOrderModal";
import { useNewOrderModal } from "@/components/orders/useNewOrderModal";
import { OpenSalesModal } from "./partials/OpenSalesModal";
import { useOpenSalesModal } from "./partials/useOpenSalesModal";
import { AdminRoutes } from "@/enums/RoutesEnum";

const ICON_MAP: Record<string, LucideIcon> = {
    Award,
    ShoppingCart,
    Package,
    Landmark,
};

export default function DashboardPage() {
    const navigate = useNavigate();
    const {
        orders, ordersLoading, isFetchingNextPage, hasNextPage, fetchNextPage, sistemaId, stats,
    } = useDashboard();

    const {
        isOpen: newOrderOpen, openModal: openNewOrder,
        handleClose: closeNewOrder, formik: newOrderFormik, isPending: newOrderPending,
    } = useNewOrderModal();

    const {
        isOpen: openSalesOpen, openModal: openSales,
        handleClose: closeSales, formik: openSalesFormik, isPending: openSalesPending,
    } = useOpenSalesModal();

    const cajaAbierta = !!sistemaId;

    const today = new Date().toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="px-5 py-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
                    <p className="text-stone-500 text-sm mt-0.5 capitalize">{today}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                    {cajaAbierta ? (
                        <>
                            <button
                                onClick={() => navigate(AdminRoutes.CloseSales)}
                                className="flex items-center gap-2 bg-stone-100 hover:bg-red-100 text-stone-600 hover:text-red-600 font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
                            >
                                <Lock size={16} />
                                Cerrar caja
                            </button>
                            <button
                                onClick={openNewOrder}
                                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
                            >
                                <Plus size={16} />
                                Nueva orden
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={openSales}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
                        >
                            <Unlock size={16} />
                            Abrir caja
                        </button>
                    )}
                </div>
            </div>

            <SubscriptionBanner />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat) => (
                    <Widget
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        up={stat.up}
                        iconBg={stat.iconBg}
                        iconColor={stat.iconColor}
                        wicon={ICON_MAP[stat.icon]}
                    />
                ))}
            </div>

            <RecentOrders
                orders={orders}
                isLoading={ordersLoading}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                sistemaId={sistemaId}
                onViewAll={() => navigate("/orders")}
                onLoadMore={fetchNextPage}
            />

            <NewOrderModal
                isOpen={newOrderOpen}
                isPending={newOrderPending}
                formik={newOrderFormik}
                onClose={closeNewOrder}
            />

            <OpenSalesModal
                isOpen={openSalesOpen}
                isPending={openSalesPending}
                formik={openSalesFormik}
                onClose={closeSales}
            />
        </div>
    );
}

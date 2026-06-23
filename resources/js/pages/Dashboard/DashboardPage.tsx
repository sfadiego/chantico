import { Widget } from "@/components/dashboard/widgets/Widget";
import { DollarSign, ShoppingCart, Package, Landmark, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "./useDashboard";
import { RecentOrders } from "./partials/RecentOrders";
import { NewOrderModal } from "./partials/NewOrderModal";
import { useNewOrderModal } from "./partials/useNewOrderModal";

const mockStats = [
    {
        title: "Ventas del día",
        value: "$1,250.00",
        wicon: DollarSign,
        trend: "+12% vs ayer",
        up: true,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
    },
    {
        title: "Órdenes activas",
        value: "8",
        wicon: ShoppingCart,
        trend: "2 en espera",
        up: true,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        title: "Productos disponibles",
        value: "43",
        wicon: Package,
        trend: "2 sin stock",
        up: false,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
    {
        title: "Estado de caja",
        value: "Abierta",
        wicon: Landmark,
        trend: "desde las 8:00 AM",
        up: true,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
    },
];

export default function DashboardPage() {
    const navigate = useNavigate();
    const { orders, ordersLoading, isFetchingNextPage, hasNextPage, fetchNextPage, sistemaId } = useDashboard();
    const { isOpen, openModal, handleClose, formik, isPending } = useNewOrderModal();

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
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm self-start sm:self-auto"
                >
                    <Plus size={16} />
                    Nueva orden
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {mockStats.map((stat) => (
                    <Widget key={stat.title} {...stat} />
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
                isOpen={isOpen}
                isPending={isPending}
                formik={formik}
                onClose={handleClose}
            />
        </div>
    );
}

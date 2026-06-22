import { DollarSign, ShoppingCart, Package, Landmark, TrendingUp, TrendingDown, Plus, ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockStats = [
    {
        title: "Ventas del día",
        value: "$1,250.00",
        icon: DollarSign,
        trend: "+12% vs ayer",
        up: true,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
    },
    {
        title: "Órdenes activas",
        value: "8",
        icon: ShoppingCart,
        trend: "2 en espera",
        up: true,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        title: "Productos disponibles",
        value: "43",
        icon: Package,
        trend: "2 sin stock",
        up: false,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
    {
        title: "Estado de caja",
        value: "Abierta",
        icon: Landmark,
        trend: "desde las 8:00 AM",
        up: true,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
    },
];

const mockOrders = [
    { id: 1, name: "Mesa 1", items: 3, total: 145, status: "En proceso", time: "10:32" },
    { id: 2, name: "Mesa 3", items: 1, total: 45, status: "En proceso", time: "10:45" },
    { id: 3, name: "Llevar #1", items: 5, total: 230, status: "Cerrado", time: "10:15" },
    { id: 4, name: "Mesa 2", items: 2, total: 90, status: "Cancelado", time: "09:50" },
    { id: 5, name: "Mesa 4", items: 4, total: 175, status: "Cerrado", time: "09:20" },
];

const statusStyles: Record<string, string> = {
    "En proceso": "bg-amber-100 text-amber-700",
    Cerrado: "bg-emerald-100 text-emerald-700",
    Cancelado: "bg-red-100 text-red-600",
};

export default function DashboardPage() {
    const navigate = useNavigate();

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
                    onClick={() => navigate("/take-order")}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm self-start sm:self-auto"
                >
                    <Plus size={16} />
                    Nueva orden
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {mockStats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                            >
                                <stat.icon size={18} className={stat.iconColor} />
                            </div>
                            {stat.up ? (
                                <TrendingUp size={14} className="text-emerald-500 mt-1" />
                            ) : (
                                <TrendingDown size={14} className="text-red-400 mt-1" />
                            )}
                        </div>
                        <p className="text-stone-500 text-xs font-medium leading-tight">
                            {stat.title}
                        </p>
                        <p className="text-stone-900 text-xl font-bold mt-1">{stat.value}</p>
                        <p
                            className={`text-xs mt-1 ${stat.up ? "text-emerald-600" : "text-red-400"}`}
                        >
                            {stat.trend}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-stone-100 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                    <h2 className="font-semibold text-stone-900">Órdenes recientes</h2>
                    <button className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors">
                        Ver todas
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-stone-100">
                                {["Pedido", "Artículos", "Total", "Hora", "Estatus"].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-3"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {mockOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-stone-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4 font-medium text-stone-900 text-sm">
                                        {order.name}
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 text-sm">
                                        {order.items}{" "}
                                        {order.items === 1 ? "artículo" : "artículos"}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-stone-900 text-sm">
                                        ${order.total}.00
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 text-sm">
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={13} />
                                            {order.time}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="sm:hidden divide-y divide-stone-100">
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            className="px-5 py-4 flex items-center justify-between"
                        >
                            <div>
                                <p className="font-medium text-stone-900 text-sm">{order.name}</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-stone-500 text-xs">
                                        {order.items} artículos
                                    </span>
                                    <span className="text-stone-400 text-xs flex items-center gap-1">
                                        <Clock size={11} />
                                        {order.time}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5">
                                <span className="font-semibold text-stone-900 text-sm">
                                    ${order.total}.00
                                </span>
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

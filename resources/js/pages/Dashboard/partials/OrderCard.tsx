import { IOrder } from "@/models/IOrder";
import { Clock, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStatusStyle, formatOrderTime } from "../useDashboard";

interface OrderCardProps {
    order: IOrder;
}

export const OrderCard = ({ order }: OrderCardProps) => {
    const navigate = useNavigate();
    const statusNombre = order.status?.nombre ?? "—";

    return (
        <div
            onClick={() => navigate(`/take-order/${order.id}`)}
            className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
        >
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
                <Receipt size={16} className="text-stone-400" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900 truncate">
                    {order.nombre_pedido}
                </p>
                <span className="flex items-center gap-1 text-xs text-stone-400 mt-0.5">
                    <Clock size={11} />
                    {formatOrderTime(order.created_at)}
                </span>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-sm font-bold text-stone-900">
                    ${order.total.toFixed(2)}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(statusNombre)}`}>
                    {statusNombre}
                </span>
            </div>
        </div>
    );
};

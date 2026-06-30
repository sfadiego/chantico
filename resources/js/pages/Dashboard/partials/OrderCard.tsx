import { IOrder } from "@/models/IOrder";
import { Clock, Receipt, Pencil, Trash2, Check, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStatusStyle, getStatusLabel, formatOrderTime } from "../useDashboard";
import { useOrderActions } from "@/components/orders/useOrderActions";
import { PayOrderButton } from "@/components/orders/PayOrderButton";
import { PrintTicketButton } from "@/components/orders/PrintTicketButton";
import { KitchenViewModal } from "@/components/orders/KitchenViewModal";

interface OrderCardProps {
    order: IOrder;
}

export const OrderCard = ({ order }: OrderCardProps) => {
    const navigate = useNavigate();
    const statusNombre = getStatusLabel(order.estatus_pedido_id);

    const {
        isEditing,
        editedName,
        setEditedName,
        isUpdating,
        isDeleting,
        handleEditStart,
        handleEditConfirm,
        handleEditCancel,
        handleKeyDown,
        handleDelete,
    } = useOrderActions(order);

    return (
        <div
            onClick={() => !isEditing && navigate(`/take-order/${order.id}`)}
            className={`flex flex-col gap-2 px-4 py-3 rounded-xl bg-stone-50 transition-colors sm:flex-row sm:items-center sm:gap-3 ${!isEditing ? "hover:bg-stone-100 cursor-pointer" : "cursor-default"}`}
        >
            {/* Fila superior: icono + nombre + tiempo/estado */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Receipt size={15} className="text-stone-400" />
                </div>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            autoFocus
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full text-sm font-semibold text-stone-900 bg-white border border-amber-400 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-amber-300"
                        />
                    ) : (
                        <p className="text-sm font-semibold text-stone-900 truncate">
                            {order.nombre_pedido}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock size={10} />
                            {formatOrderTime(order.created_at)}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.estatus_pedido_id)}`}>
                            {statusNombre}
                        </span>
                    </div>
                </div>
            </div>

            {/* Fila inferior en móvil / misma fila en desktop: total + botones */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0" onClick={(e) => e.stopPropagation()}>
                <span className="text-sm font-bold text-stone-900 tabular-nums shrink-0">
                    ${order.total.toFixed(2)}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleEditConfirm}
                                disabled={isUpdating}
                                title="Confirmar"
                                className="flex items-center justify-center w-7 h-7 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all disabled:opacity-50"
                            >
                                {isUpdating
                                    ? <Loader size={13} className="animate-spin" />
                                    : <Check size={13} />
                                }
                            </button>
                            <button
                                onClick={handleEditCancel}
                                title="Cancelar edición"
                                className="flex items-center justify-center w-7 h-7 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-all"
                            >
                                <X size={13} />
                            </button>
                        </>
                    ) : (
                        <>
                            <KitchenViewModal order={order} />
                            <PrintTicketButton orderId={order.id} showLabel />
                            <PayOrderButton order={order} />
                            <button
                                onClick={handleEditStart}
                                title="Editar nombre"
                                className="flex items-center justify-center w-7 h-7 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all"
                            >
                                <Pencil size={13} />
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                title="Eliminar orden"
                                className="flex items-center justify-center w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all disabled:opacity-50"
                            >
                                {isDeleting
                                    ? <Loader size={13} className="animate-spin text-red-500" />
                                    : <Trash2 size={13} />
                                }
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

import { IOrder } from "@/models/IOrder";
import { Clock, Receipt, Printer, Banknote, Pencil, Trash2, Check, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStatusStyle, formatOrderTime } from "../useDashboard";
import { useOrderCard } from "./useOrderCard";

interface OrderCardProps {
    order: IOrder;
}

export const OrderCard = ({ order }: OrderCardProps) => {
    const navigate = useNavigate();
    const statusNombre = order.status?.nombre ?? "—";

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
    } = useOrderCard(order);

    const handlePrint = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: imprimir ticket
    };

    const handlePay = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: flujo de pago
    };

    return (
        <div
            onClick={() => !isEditing && navigate(`/take-order/${order.id}`)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 transition-colors ${!isEditing ? "hover:bg-stone-100 cursor-pointer" : "cursor-default"}`}
        >
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
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(statusNombre)}`}>
                        {statusNombre}
                    </span>
                </div>
            </div>

            <span className="text-sm font-bold text-stone-900 tabular-nums shrink-0">
                ${order.total.toFixed(2)}
            </span>

            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
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
                        <button
                            onClick={handlePrint}
                            title="Imprimir ticket"
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-white border border-transparent hover:border-stone-200 transition-all text-xs font-medium"
                        >
                            <Printer size={14} />
                            <span className="hidden sm:inline">Imprimir</span>
                        </button>
                        <button
                            onClick={handlePay}
                            disabled={order.total === 0}
                            title="Pagar"
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all text-xs font-medium disabled:opacity-40"
                        >
                            <Banknote size={14} />
                            <span className="hidden sm:inline">Pagar</span>
                        </button>
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
    );
};

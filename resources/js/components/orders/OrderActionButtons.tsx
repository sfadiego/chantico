import { Pencil, Trash2, Check, X, Loader, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IOrder } from "@/models/IOrder";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { useOrderActions } from "./useOrderActions";
import { PayOrderButton } from "./PayOrderButton";
import { PrintTicketButton } from "./PrintTicketButton";
import { KitchenViewModal } from "./KitchenViewModal";

interface OrderActionButtonsProps {
    order: IOrder;
    onSuccess?: () => void;
}

export const OrderActionButtons = ({ order, onSuccess }: OrderActionButtonsProps) => {
    const navigate = useNavigate();
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
    } = useOrderActions(order, onSuccess);

    const isInProcess = order.estatus_pedido_id === OrderStatusEnum.InProcess;
    const isKitchenVisible = [OrderStatusEnum.InProcess, OrderStatusEnum.ReadyToServe].includes(order.estatus_pedido_id);

    if (isEditing) {
        return (
            <div
                className="flex items-center gap-1.5 w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    autoFocus
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 min-w-0 text-xs font-medium text-stone-900 bg-white border border-amber-400 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-amber-300"
                />
                <button
                    onClick={handleEditConfirm}
                    disabled={isUpdating}
                    title="Confirmar"
                    className="flex items-center justify-center w-6 h-6 rounded-md text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all disabled:opacity-50 shrink-0"
                >
                    {isUpdating
                        ? <Loader size={12} className="animate-spin" />
                        : <Check size={12} />
                    }
                </button>
                <button
                    onClick={handleEditCancel}
                    title="Cancelar edición"
                    className="flex items-center justify-center w-6 h-6 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-all shrink-0"
                >
                    <X size={12} />
                </button>
            </div>
        );
    }

    return (
        <div
            className="flex items-center justify-center gap-1"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={(e) => { e.stopPropagation(); navigate(`/take-order/${order.id}`); }}
                title="Ver orden"
                className="flex items-center justify-center w-7 h-7 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all"
            >
                <ExternalLink size={13} />
            </button>

            {isKitchenVisible && <KitchenViewModal order={order} />}

            <PrintTicketButton orderId={order.id} />

            {isInProcess && (
                <PayOrderButton
                    order={order}
                    onSuccess={onSuccess}
                    showLabel={false}
                    className="flex items-center justify-center w-7 h-7 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                />
            )}

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
        </div>
    );
};

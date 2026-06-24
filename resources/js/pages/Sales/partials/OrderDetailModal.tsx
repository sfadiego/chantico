import { Modal } from "@mantine/core";
import { IOrder } from "@/models/IOrder";
import { Receipt } from "lucide-react";
import { getStatusStyle } from "@/pages/Dashboard/useDashboard";

interface OrderDetailModalProps {
    isOpen: boolean;
    order: IOrder | null;
    onClose: () => void;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("es-MX", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export const OrderDetailModal = ({ isOpen, order, onClose }: OrderDetailModalProps) => {
    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <Receipt size={18} className="text-amber-500" />
                    <span className="font-semibold text-stone-800">Detalle de orden</span>
                </div>
            }
            size="sm"
            radius="lg"
            padding="lg"
        >
            {!order ? (
                <p className="text-center text-stone-400 py-8 text-sm">Sin información</p>
            ) : (
                <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs text-stone-400 font-medium">Orden</p>
                            <p className="text-lg font-bold text-stone-900">{order.nombre_pedido}</p>
                            <p className="text-xs text-stone-400 mt-0.5">{formatDate(order.created_at)}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${getStatusStyle(order.status?.nombre)}`}>
                            {order.status?.nombre ?? "—"}
                        </span>
                    </div>

                    {/* Totals */}
                    <div className="bg-stone-50 rounded-2xl border border-stone-100 p-4 space-y-3">
                        <div className="flex justify-between text-sm text-stone-500">
                            <span>Subtotal</span>
                            <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        {order.descuento > 0 && (
                            <div className="flex justify-between text-sm text-emerald-600">
                                <span>Descuento ({order.descuento}%)</span>
                                <span>-{formatCurrency(order.subtotal * order.descuento / 100)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-stone-900 text-base pt-2 border-t border-stone-200">
                            <span>Total</span>
                            <span>{formatCurrency(order.total)}</span>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

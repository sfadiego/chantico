import { DataTable } from "mantine-datatable";
import { ClipboardList, RefreshCw, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IOrder } from "@/models/IOrder";
import { useOrderList } from "./useOrderList";
import { OrderFilters } from "./partials/OrderFilters";
import { NewOrderModal } from "@/components/orders/NewOrderModal";
import { useNewOrderModal } from "@/components/orders/useNewOrderModal";

export default function OrderListPage() {
    const navigate = useNavigate();
    const {
        dataTableProps,
        isLoading,
        refetch,
        sistemaId,
        fecha,
        estatusId,
        handleFechaChange,
        handleEstatusChange,
        handleClearFilters,
    } = useOrderList();

    const {
        isOpen, openModal, handleClose, formik, isPending,
    } = useNewOrderModal();

    return (
        <div className="px-5 py-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">Órdenes</h1>
                    <p className="text-stone-500 text-sm mt-0.5">
                        {sistemaId ? `Sesión #${sistemaId}` : "Sin caja abierta"}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => refetch()}
                        className="flex items-center gap-2 text-sm font-medium text-stone-500
                            hover:text-stone-700 bg-white border border-stone-200 px-3 py-2
                            rounded-xl hover:bg-stone-50 transition-colors"
                    >
                        <RefreshCw size={15} />
                        Actualizar
                    </button>

                    {sistemaId && (
                        <button
                            onClick={openModal}
                            className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                            style={{ backgroundColor: "var(--color-primary)" }}
                        >
                            <Plus size={15} />
                            Nueva orden
                        </button>
                    )}
                </div>
            </div>

            {!sistemaId ? (
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm py-16
                    flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center">
                        <ClipboardList size={22} className="text-stone-300" />
                    </div>
                    <p className="text-stone-400 text-sm">No hay una caja abierta.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
                    <OrderFilters
                        fecha={fecha}
                        estatusId={estatusId}
                        onFechaChange={handleFechaChange}
                        onEstatusChange={handleEstatusChange}
                        onClear={handleClearFilters}
                    />
                    <DataTable
                        fetching={isLoading}
                        {...dataTableProps}
                        onRowClick={({ record }: { record: IOrder }) =>
                            navigate(`/take-order/${record.id}`)
                        }
                        rowStyle={() => ({ cursor: "pointer" })}
                    />
                </div>
            )}

            <NewOrderModal
                isOpen={isOpen}
                isPending={isPending}
                formik={formik}
                onClose={handleClose}
            />
        </div>
    );
}

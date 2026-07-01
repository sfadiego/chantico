import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { Calendar, SlidersHorizontal, X } from "lucide-react";

export const getActiveStatuses = (showReadyToServe: boolean): string =>
    showReadyToServe
        ? `${OrderStatusEnum.InProcess},${OrderStatusEnum.ReadyToServe}`
        : String(OrderStatusEnum.InProcess);

const BASE_STATUS_OPTIONS = [
    { value: String(OrderStatusEnum.InProcess),    label: "En proceso",        dot: "bg-amber-400",   readyToServeOnly: false, hideWhenNoRts: true },
    { value: String(OrderStatusEnum.ReadyToServe), label: "Lista para servir", dot: "bg-blue-400",    readyToServeOnly: true,  hideWhenNoRts: false },
    { value: String(OrderStatusEnum.Closed),       label: "Cerrado",           dot: "bg-emerald-400", readyToServeOnly: false, hideWhenNoRts: false },
];

interface OrderFiltersProps {
    fecha: string | null;
    estatusId: string;
    showReadyToServe?: boolean;
    onFechaChange: (value: string | null) => void;
    onEstatusChange: (value: string) => void;
    onClear: () => void;
}

export const OrderFilters = ({
    fecha,
    estatusId,
    showReadyToServe = true,
    onFechaChange,
    onEstatusChange,
    onClear,
}: OrderFiltersProps) => {
    const activeStatuses = getActiveStatuses(showReadyToServe);
    const statusOptions = [
        { value: activeStatuses, label: "Activos", dot: "bg-stone-400" },
        ...BASE_STATUS_OPTIONS.filter((o) =>
            (!o.readyToServeOnly || showReadyToServe) &&
            (!o.hideWhenNoRts || showReadyToServe)
        ),
    ];
    const hasActiveFilters = !!fecha || estatusId !== activeStatuses;

    return (
        <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-stone-400" />
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Filtros
                </span>
                {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        activos
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {/* Fecha */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-stone-500">Fecha</label>
                    <div className="relative">
                        <Calendar
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                        />
                        <input
                            type="date"
                            value={fecha ?? ""}
                            onChange={(e) => onFechaChange(e.target.value || null)}
                            className="h-9 pl-8 pr-3 rounded-xl border border-stone-200 bg-stone-50
                                text-sm text-stone-700 focus:outline-none focus:ring-2
                                focus:ring-amber-400 focus:border-transparent focus:bg-white
                                transition-all w-44"
                        />
                    </div>
                </div>

                {/* Estatus — chips */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-stone-500">Estatus</label>
                    <div className="flex gap-2">
                        {statusOptions.map((opt) => {
                            const active = estatusId === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => onEstatusChange(opt.value)}
                                    className={`h-9 flex items-center gap-2 px-3.5 rounded-xl border text-sm
                                        font-medium transition-all
                                        ${active
                                            ? "border-amber-400 bg-amber-50 text-amber-700 shadow-sm"
                                            : "border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300 hover:bg-white"
                                        }`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                                    {opt.label}
                                </button>
                            );
                        })}
                        {/* Limpiar */}
                        {hasActiveFilters && (
                            <div className="flex flex-col gap-1.5">
                                <button
                                    onClick={onClear}
                                    className="h-9 flex items-center gap-1.5 px-3 rounded-xl border
                                border-stone-200 bg-stone-50 text-xs font-medium text-stone-400
                                hover:border-red-200 hover:bg-red-50 hover:text-red-500
                                transition-all"
                                >
                                    <X size={13} />
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
};

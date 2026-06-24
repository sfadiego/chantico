import { Calendar, X, SlidersHorizontal } from "lucide-react";

interface SalesFiltersProps {
    fecha: string | null;
    onFechaChange: (value: string | null) => void;
    onClear: () => void;
}

export const SalesFilters = ({ fecha, onFechaChange, onClear }: SalesFiltersProps) => {
    const hasActive = !!fecha;

    return (
        <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-stone-400" />
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Filtros
                </span>
                {hasActive && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        activos
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-3 items-end">
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

                {hasActive && (
                    <button
                        onClick={onClear}
                        className="h-9 flex items-center gap-1.5 px-3 rounded-xl border
                            border-stone-200 bg-stone-50 text-xs font-medium text-stone-400
                            hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                        <X size={13} />
                        Limpiar
                    </button>
                )}
            </div>
        </div>
    );
};

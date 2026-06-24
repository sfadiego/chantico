import { X, Banknote, CheckCircle, Loader } from "lucide-react";

interface PayModalProps {
    isOpen: boolean;
    subtotal: number;
    cash: string;
    setCash: (v: string) => void;
    change: number;
    canPay: boolean;
    isPending: boolean;
    onPay: () => void;
    onClose: () => void;
}

export const PayModal = ({
    isOpen,
    subtotal,
    cash,
    setCash,
    change,
    canPay,
    isPending,
    onPay,
    onClose,
}: PayModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Banknote size={16} className="text-emerald-600" />
                        </div>
                        <h2 className="font-semibold text-stone-900 text-sm">Cobro de orden</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {/* Total a cobrar */}
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-stone-500 mb-1">Total a cobrar</p>
                        <p className="text-3xl font-bold text-stone-900 tabular-nums">
                            ${subtotal.toFixed(2)}
                        </p>
                    </div>

                    {/* Efectivo recibido */}
                    <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1.5">
                            Efectivo recibido
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">
                                $
                            </span>
                            <input
                                type="number"
                                min="0"
                                step="0.50"
                                value={cash}
                                onChange={(e) => setCash(e.target.value)}
                                placeholder="0.00"
                                autoFocus
                                className="w-full pl-7 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent tabular-nums"
                            />
                        </div>
                    </div>

                    {/* Cambio */}
                    <div
                        className={`rounded-xl p-4 flex items-center justify-between transition-colors ${
                            change >= 0 && cash !== ""
                                ? "bg-emerald-50 border border-emerald-200"
                                : "bg-stone-50 border border-stone-100"
                        }`}
                    >
                        <span className="text-sm font-medium text-stone-600">Cambio</span>
                        <span
                            className={`text-xl font-bold tabular-nums ${
                                change >= 0 && cash !== ""
                                    ? "text-emerald-700"
                                    : "text-stone-400"
                            }`}
                        >
                            ${change >= 0 ? change.toFixed(2) : "0.00"}
                        </span>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-2 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={onPay}
                            disabled={!canPay || isPending}
                            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader size={14} className="animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={15} />
                                    Pagar y cerrar
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

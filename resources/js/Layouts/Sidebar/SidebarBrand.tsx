import { Coffee, X } from "lucide-react";

interface SidebarBrandProps {
    onClose: () => void;
}

export function SidebarBrand({ onClose }: SidebarBrandProps) {
    const appName = import.meta.env.VITE_APP_NAME || ''
    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-700/60">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Coffee size={16} className="text-white" />
                </div>
                <span className="text-white font-bold text-base tracking-tight">
                    {appName}
                </span>
            </div>
            <button
                onClick={onClose}
                className="lg:hidden text-stone-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Cerrar menú"
            >
                <X size={18} />
            </button>
        </div>
    );
}

import { Coffee, X } from "lucide-react";

interface SidebarBrandProps {
    onClose: () => void;
}

export function SidebarBrand({ onClose }: SidebarBrandProps) {
    const appName = import.meta.env.VITE_APP_NAME || '';
    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    <Coffee size={16} className="text-white" />
                </div>
                <span
                    className="font-bold text-base tracking-tight"
                    style={{ color: "var(--color-font)" }}
                >
                    {appName}
                </span>
            </div>
            <button
                onClick={onClose}
                className="lg:hidden p-1 rounded transition-colors"
                style={{ color: "color-mix(in srgb, var(--color-font) 50%, transparent)" }}
                aria-label="Cerrar menú"
            >
                <X size={18} />
            </button>
        </div>
    );
}

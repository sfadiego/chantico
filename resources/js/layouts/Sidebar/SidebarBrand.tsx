import { Coffee, ShoppingCart, X } from "lucide-react";
import { useGetBusinessConfig } from "@/services/useBusinessConfigService";
import { ApisEnum } from "@/configs/apisEnum";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

interface SidebarBrandProps {
    onClose: () => void;
}

export function SidebarBrand({ onClose }: SidebarBrandProps) {
    const { data: config } = useGetBusinessConfig();
    const appName = config?.business_name ?? import.meta.env.VITE_APP_NAME;
    const logoUrl = config?.logo_path
        ? `${ApisEnum.BaseUrl}${ApiRoutes.Files}/${config.logo_path}`
        : null;

    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    {logoUrl ? (
                        <img src={logoUrl} alt={appName} className="w-full h-full object-cover" />
                    ) : (
                        <ShoppingCart size={16} className="text-white" />
                    )}
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

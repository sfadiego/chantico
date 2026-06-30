import { ShieldCheck, User, ChefHat, CreditCard } from "lucide-react";
import { RoleEnum } from "@/enums/RoleEnum";

const ROLE_CONFIG: Record<number, { label: string; icon: React.ReactNode; className: string }> = {
    [RoleEnum.Admin]:   { label: "Admin",    icon: <ShieldCheck size={11} />, className: "bg-indigo-50 text-indigo-700" },
    [RoleEnum.Employe]: { label: "Empleado", icon: <User size={11} />,        className: "bg-slate-100 text-slate-600" },
    [RoleEnum.Cocina]:  { label: "Cocina",   icon: <ChefHat size={11} />,     className: "bg-orange-50 text-orange-700" },
    [RoleEnum.Caja]:    { label: "Caja",     icon: <CreditCard size={11} />,  className: "bg-emerald-50 text-emerald-700" },
};

const DEFAULT_CONFIG = { label: "Desconocido", icon: <User size={11} />, className: "bg-slate-100 text-slate-500" };

interface RoleBadgeProps {
    rolId: number;
}

export default function RoleBadge({ rolId }: RoleBadgeProps) {
    const config = ROLE_CONFIG[rolId] ?? DEFAULT_CONFIG;

    return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${config.className}`}>
            {config.icon}
            {config.label}
        </span>
    );
}

export function getRoleLabel(rolId: number): string {
    return ROLE_CONFIG[rolId]?.label ?? DEFAULT_CONFIG.label;
}

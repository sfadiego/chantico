import { Building2, LogOut, LayoutDashboard, CreditCard, Settings2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { superAdminAuth } from "@/contexts/SuperAdminContext";
import { SuperAdminRoutes } from "@/enums/RoutesEnum";

const NAV_ITEMS = [
    { to: SuperAdminRoutes.Tenants,       label: "Clientes",        icon: <LayoutDashboard size={16} /> },
    { to: SuperAdminRoutes.Subscriptions, label: "Suscripciones",   icon: <CreditCard size={16} /> },
    { to: SuperAdminRoutes.Settings,      label: "Configuración",   icon: <Settings2 size={16} /> },
];

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <aside className="w-60 flex-shrink-0 bg-slate-900 flex flex-col">
                <div className="px-5 py-5 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <Building2 size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-white text-sm font-bold leading-tight">Super Admin</p>
                            <p className="text-slate-400 text-xs">{import.meta.env.VITE_APP_NAME}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-indigo-600 text-white"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-3 pb-4">
                    <button
                        onClick={superAdminAuth.logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <LogOut size={16} />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

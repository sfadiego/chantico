import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Sidebar } from "./Sidebar/Sidebar";
import { Navbar } from "./Navbar/Navbar";
import { useGetActiveSale } from "@/services/useOpenSalesService";
import { useGetBusinessConfig } from "@/services/useBusinessConfigService";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, setSistema } = useAxios();
    const { data: activeSale } = useGetActiveSale();
    const { data: config } = useGetBusinessConfig();

    useEffect(() => {
        setSistema(activeSale?.id ?? null);
    }, [activeSale]);

    useEffect(() => {
        if (!config) return;
        const root = document.documentElement;
        root.style.setProperty("--color-primary", config.primary_color);
        root.style.setProperty("--color-sidebar", config.sidebar_color);
        root.style.setProperty("--color-font", config.font_color);
        root.style.setProperty("--color-label", config.label_color);
    }, [config]);

    const userName = user
        ? `${user.nombre} ${user.apellido_paterno}`
        : "Usuario";

    const userRole = user?.rol_id === 1 ? "Administrador" : "Empleado";

    return (
        <div className="flex h-screen bg-stone-50 overflow-hidden">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={logout}
                userName={userName}
                userRole={userRole}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

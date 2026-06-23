import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Sidebar } from "./Sidebar/Sidebar";
import { Navbar } from "./Navbar/Navbar";
import { useGetActiveSale } from "@/services/useOpenSalesService";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, setSistema } = useAxios();
    const { data: activeSale } = useGetActiveSale();

    useEffect(() => {
        setSistema(activeSale?.data?.id ?? null);
    }, [activeSale]);

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

import { LogOut } from "lucide-react";

interface SidebarUserProps {
    name: string;
    role: string;
    onLogout: () => void;
}

export function SidebarUser({ name, role, onLogout }: SidebarUserProps) {
    const initials = name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="px-3 py-4 border-t border-stone-700/60">
            <div className="flex items-center gap-3 px-3 py-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {initials}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{name}</p>
                    <p className="text-stone-400 text-xs truncate">{role}</p>
                </div>
            </div>
            <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-stone-400 hover:bg-stone-800 hover:text-white text-sm transition-colors"
            >
                <LogOut size={16} />
                Cerrar sesión
            </button>
        </div>
    );
}

import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Tag,
    BarChart2,
    ShoppingBag,
    LucideIcon,
    Coffee,
    Settings,
} from "lucide-react";

interface NavItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Órdenes", icon: Package, path: "/orders" },
    { label: "Productos", icon: Coffee, path: "/products" },
    { label: "Categorías", icon: Tag, path: "/categories" },
    { label: "Ventas", icon: ShoppingBag, path: "/sales" },
    { label: "Estadísticas", icon: BarChart2, path: "/statistics" },
];

interface SidebarNavProps {
    onItemClick: () => void;
}

export function SidebarNav({ onItemClick }: SidebarNavProps) {
    return (
        <nav className="flex-1 px-3 py-5 overflow-y-auto flex flex-col">
            <div className="space-y-0.5 flex-1">
                {navItems.map((item) => (
                    <SidebarNavItem key={item.path} item={item} onClick={onItemClick} />
                ))}
            </div>

            <div className="pt-3 border-t border-white/10 mt-3 space-y-0.5">
                <SidebarNavItem
                    item={{ label: "Configuración", icon: Settings, path: "/admin" }}
                    onClick={onItemClick}
                />
            </div>
        </nav>
    );
}

interface SidebarNavItemProps {
    item: NavItem;
    onClick: () => void;
}

function SidebarNavItem({ item, onClick }: SidebarNavItemProps) {
    return (
        <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-white/10"
            style={({ isActive }) =>
                isActive
                    ? { backgroundColor: "var(--color-primary)", color: "var(--color-font)" }
                    : { color: "color-mix(in srgb, var(--color-font) 65%, transparent)" }
            }
        >
            <item.icon size={18} />
            {item.label}
        </NavLink>
    );
}

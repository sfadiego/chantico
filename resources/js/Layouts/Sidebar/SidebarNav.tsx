import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    Package,
    Tag,
    BarChart2,
    ShoppingBag,
    LucideIcon,
} from "lucide-react";

interface NavItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Órdenes", icon: ClipboardList, path: "/orders" },
    { label: "Productos", icon: Package, path: "/products" },
    { label: "Categorías", icon: Tag, path: "/categories" },
    { label: "Ventas", icon: ShoppingBag, path: "/sales" },
    { label: "Estadísticas", icon: BarChart2, path: "/statistics" },
];

interface SidebarNavProps {
    onItemClick: () => void;
}

export function SidebarNav({ onItemClick }: SidebarNavProps) {
    return (
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
                <SidebarNavItem key={item.path} item={item} onClick={onItemClick} />
            ))}
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
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150 ${
                    isActive
                        ? "bg-amber-500 text-white"
                        : "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
                }`
            }
        >
            <item.icon size={18} />
            {item.label}
        </NavLink>
    );
}

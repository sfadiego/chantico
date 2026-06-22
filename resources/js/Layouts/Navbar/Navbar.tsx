import { Menu, Coffee } from "lucide-react";

interface NavbarProps {
    onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <header className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <button
                onClick={onMenuClick}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
                aria-label="Abrir menú"
            >
                <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
                    <Coffee size={13} className="text-white" />
                </div>
                <span className="font-bold text-stone-900 text-sm">Chantico POS</span>
            </div>
        </header>
    );
}

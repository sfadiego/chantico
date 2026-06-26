import { Image, Palette, Phone, Printer } from "lucide-react";

const SECTIONS = [
    { id: "logo",       label: "Logo",             icon: <Image size={14} /> },
    { id: "colores",    label: "Colores",          icon: <Palette size={14} /> },
    { id: "negocio",    label: "Info del negocio", icon: <Phone size={14} /> },
    { id: "impresora",  label: "Impresora",        icon: <Printer size={14} /> },
];

export const AdminNav = () => {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <nav className="hidden lg:flex flex-col gap-1 w-44 shrink-0 pt-1">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2 mb-1">
                Secciones
            </p>
            {SECTIONS.map((s) => (
                <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors text-left"
                >
                    <span className="text-stone-400">{s.icon}</span>
                    {s.label}
                </button>
            ))}
        </nav>
    );
};

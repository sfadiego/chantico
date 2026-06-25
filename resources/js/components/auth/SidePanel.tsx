import { BarChart2, Coffee, ShoppingBag, ShoppingCart } from 'lucide-react';

const features = [
    { icon: ShoppingCart, label: "Gestión de pedidos" },
    { icon: ShoppingBag, label: "Control de ventas" },
    { icon: BarChart2, label: "Estadísticas" },
];

export const SidePanel = () => {
    const appName = import.meta.env.VITE_APP_NAME;
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full" />
                <div className="absolute bottom-16 right-12 w-72 h-72 bg-white rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-7 mb-8 shadow-xl">
                    <ShoppingCart size={56} className="text-white" />
                </div>
                <h1 className="text-white text-4xl font-bold tracking-tight mb-3">
                    {appName}
                </h1>
                <p className="text-amber-100 text-base leading-relaxed mb-12">
                    Sistema de punto de venta para tu negocio
                </p>
                <div className="grid grid-cols-3 gap-5 w-full">
                    {features.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2.5">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Icon size={22} className="text-white" />
                            </div>
                            <span className="text-amber-100 text-xs font-medium leading-tight text-center">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

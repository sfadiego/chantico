import { useNavigate } from "react-router-dom";
import { ShieldOff, ArrowLeft } from "lucide-react";

export default function Forbidden() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ShieldOff size={32} className="text-red-500" />
                </div>
                <h1 className="text-4xl font-bold text-stone-900 mb-2">403</h1>
                <p className="text-stone-600 text-base mb-2 font-medium">Acceso denegado</p>
                <p className="text-stone-400 text-sm mb-8">
                    No tienes permisos para acceder a esta sección.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                    <ArrowLeft size={16} />
                    Volver
                </button>
            </div>
        </div>
    );
}

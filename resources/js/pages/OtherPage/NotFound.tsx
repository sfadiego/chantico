import { useNavigate } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={32} className="text-amber-500" />
                </div>
                <h1 className="text-4xl font-bold text-stone-900 mb-2">404</h1>
                <p className="text-stone-500 text-base mb-8">
                    La página que buscas no existe o no tienes acceso.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                    <Home size={16} />
                    Ir al inicio
                </button>
            </div>
        </div>
    );
}

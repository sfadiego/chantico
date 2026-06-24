import { Coffee } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SidePanel } from "@/components/auth/SidePanel";

export default function LoginPage() {
    const appName = import.meta.env.VITE_APP_NAME;
    return (
        <div className="min-h-screen flex">
            <SidePanel />

            <div className="flex-1 flex items-center justify-center p-6 bg-white">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="bg-amber-500 rounded-2xl p-4 shadow-lg">
                            <Coffee size={36} className="text-white" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-stone-900">Bienvenido</h2>
                        <p className="text-stone-500 text-sm mt-1">
                            Inicia sesion para continuar
                        </p>
                    </div>

                    <LoginForm />

                    <p className="text-center text-stone-400 text-xs mt-10">
                        {appName} &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}

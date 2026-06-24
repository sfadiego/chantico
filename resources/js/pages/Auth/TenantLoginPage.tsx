import { useParams, Navigate } from "react-router-dom";
import { Coffee } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { TenantSidePanel } from "@/components/auth/TenantSidePanel";
import { useTenantLoginPage } from "./useTenantLoginPage";

export default function TenantLoginPage() {
    const { slug } = useParams<{ slug: string }>();
    const { tenant, isLoading, isError } = useTenantLoginPage(slug ?? "");

    if (isError) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen flex">
            <TenantSidePanel tenant={tenant} isLoading={isLoading} />

            <div className="flex-1 flex items-center justify-center p-6 bg-white">
                <div className="w-full max-w-sm">
                    {/* Icono/logo visible en mobile */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div
                            className="rounded-2xl p-4 shadow-lg"
                            style={{ backgroundColor: "var(--color-primary)" }}
                        >
                            <Coffee size={36} className="text-white" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2
                            className="text-2xl font-bold"
                            style={{ color: "var(--color-label)" }}
                        >
                            Bienvenido
                        </h2>
                        <p className="text-stone-500 text-sm mt-1">
                            {isLoading
                                ? "Cargando..."
                                : `Inicia sesión en ${tenant?.business_name ?? ""}`}
                        </p>
                    </div>

                    <LoginForm />

                    <p className="text-center text-stone-400 text-xs mt-10">
                        {tenant?.business_name} &copy;{" "}
                        {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}

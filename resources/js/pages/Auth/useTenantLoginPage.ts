import { useEffect } from "react";
import { useGetTenantBranding } from "@/services/useTenantService";

export const useTenantLoginPage = (slug: string) => {
    const { data: tenant, isLoading, isError } = useGetTenantBranding(slug);

    // Persiste el slug para que el logout redirija a esta URL de login
    useEffect(() => {
        if (slug) {
            localStorage.setItem("tenantSlug", slug);
        }
    }, [slug]);

    // Aplica el tema del tenant como CSS vars en cuanto llegan los datos
    useEffect(() => {
        if (!tenant) return;
        const root = document.documentElement;
        root.style.setProperty("--color-primary", tenant.primary_color);
        root.style.setProperty("--color-sidebar", tenant.sidebar_color);
        root.style.setProperty("--color-font", tenant.font_color);
        root.style.setProperty("--color-label", tenant.label_color);
    }, [tenant]);

    return { tenant, isLoading, isError };
};

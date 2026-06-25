import { AlertTriangle, XCircle, Clock } from "lucide-react";
import { useGET } from "@/hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { SubscriptionStatusEnum } from "@/enums/SubscriptionStatusEnum";

interface SubscriptionStatusResponse {
    status: SubscriptionStatusEnum;
    days_remaining: number | null;
    is_lifetime: boolean;
    expires_at: string | null;
}

const WARN_DAYS = 7;

export const SubscriptionBanner = () => {
    const { data } = useGET<SubscriptionStatusResponse>({
        url: `${ApiRoutes.BusinessConfig}/subscription-status`,
        nameQuery: "subscription-status-banner",
    });

    if (!data) return null;

    const { status, days_remaining, is_lifetime } = data;

    if (is_lifetime || status === SubscriptionStatusEnum.Active && (days_remaining ?? 999) > WARN_DAYS) {
        return null;
    }

    if (status === SubscriptionStatusEnum.Expired) {
        return (
            <Banner
                icon={<XCircle size={15} />}
                color="bg-red-50 border-red-200 text-red-700"
                message="Tu suscripción ha vencido. Contacta al administrador para renovarla."
            />
        );
    }

    if (status === SubscriptionStatusEnum.Grace) {
        return (
            <Banner
                icon={<AlertTriangle size={15} />}
                color="bg-amber-50 border-amber-200 text-amber-700"
                message={`Tu suscripción venció hace poco. Período de gracia activo — contacta al administrador.`}
            />
        );
    }

    if (status === SubscriptionStatusEnum.Pending) {
        return (
            <Banner
                icon={<Clock size={15} />}
                color="bg-slate-50 border-slate-200 text-slate-500"
                message="No tienes una suscripción activa. Contacta al administrador."
            />
        );
    }

    // active pero <= WARN_DAYS
    if (status === SubscriptionStatusEnum.Active && days_remaining !== null && days_remaining <= WARN_DAYS) {
        return (
            <Banner
                icon={<Clock size={15} />}
                color="bg-amber-50 border-amber-200 text-amber-700"
                message={`Tu suscripción vence en ${days_remaining} día${days_remaining !== 1 ? "s" : ""}. Contacta al administrador para renovarla.`}
            />
        );
    }

    return null;
};

interface BannerProps {
    icon: React.ReactNode;
    color: string;
    message: string;
}

const Banner = ({ icon, color, message }: BannerProps) => (
    <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm mb-4 ${color}`}>
        <span className="shrink-0">{icon}</span>
        <p>{message}</p>
    </div>
);

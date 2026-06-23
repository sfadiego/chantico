import { useAxios } from "@/hooks/useAxios";
import { useInfiniteIndexOrder } from "@/services/useOrderService";
import { IOrder } from "@/models/IOrder";

const statusStyles: Record<string, string> = {
    "En proceso": "bg-amber-100 text-amber-700",
    Cerrado: "bg-emerald-100 text-emerald-700",
    Cancelado: "bg-red-100 text-red-600",
};

export const getStatusStyle = (nombre: string) =>
    statusStyles[nombre] ?? "bg-stone-100 text-stone-600";

export const formatOrderTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
    });

export const useDashboard = () => {
    const { sistemaId } = useAxios();
    const {
        data,
        isLoading: ordersLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteIndexOrder(sistemaId);

    const orders: IOrder[] = data?.pages.flatMap((page) => page.data) ?? [];

    return { orders, ordersLoading, isFetchingNextPage, hasNextPage, fetchNextPage, sistemaId };
};

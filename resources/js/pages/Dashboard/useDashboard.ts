import { useAxios } from "@/hooks/useAxios";
import { useInfiniteIndexOrder } from "@/services/useOrderService";
import { useGetActiveSale } from "@/services/useOpenSalesService";
import { useIndexProducts } from "@/services/useProductService";
import { useBestSeller } from "@/services/useStatisticsService";
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

const currentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

export const useDashboard = () => {
    const { sistemaId } = useAxios();

    const { data: ordersData, isLoading: ordersLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteIndexOrder(sistemaId);

    const { data: activeSale } = useGetActiveSale();
    const { data: productsData } = useIndexProducts({ page: 1, limit: 1 });
    const { data: bestSellers = [] } = useBestSeller();

    const orders: IOrder[] = ordersData?.pages.flatMap((page) => page.data) ?? [];

    const topProduct = bestSellers[0] ?? null;
    const ordenesActivas = ordersData?.pages[0]?.total ?? 0;
    const totalProductos = productsData?.total ?? 0;
    const cajaAbierta = !!sistemaId;
    const horaApertura = activeSale?.created_at
        ? formatOrderTime(activeSale.created_at)
        : null;

    const stats = [
        {
            title: "Más vendido",
            value: topProduct?.product ?? "—",
            trend: topProduct ? `${topProduct.total} unidades` : "Sin ventas",
            up: !!topProduct,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            icon: "Award",
        },
        {
            title: "Órdenes activas",
            value: String(ordenesActivas),
            trend: ordenesActivas === 1 ? "1 en proceso" : `${ordenesActivas} en proceso`,
            up: ordenesActivas > 0,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            icon: "ShoppingCart",
        },
        {
            title: "Productos",
            value: String(totalProductos),
            trend: totalProductos > 0 ? "registrados en sistema" : "Sin productos",
            up: totalProductos > 0,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            icon: "Package",
        },
        {
            title: "Estado de caja",
            value: cajaAbierta ? "Abierta" : "Cerrada",
            trend: cajaAbierta && horaApertura ? `desde las ${horaApertura}` : "Sin sesión activa",
            up: cajaAbierta,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            icon: "Landmark",
        },
    ];

    return {
        orders,
        ordersLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        sistemaId,
        stats,
    };
};

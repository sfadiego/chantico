import { useMemo, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useDataTable, DataTableRenderersMap } from "@/hooks/useDatatable";
import { useIndexOrder } from "@/services/useOrderService";
import { IOrder } from "@/models/IOrder";
import { OrderStatusEnum } from "@/enums/OrderStatusEnum";
import { getStatusStyle, formatOrderTime } from "@/pages/Dashboard/useDashboard";
import { DataTableColumn } from "mantine-datatable";
import { OrderActionButtons } from "@/components/orders/OrderActionButtons";

const renderersMap: DataTableRenderersMap = {
    total: (o: IOrder) => `$${o.total.toFixed(2)}`,
    subtotal: (o: IOrder) => `$${o.subtotal.toFixed(2)}`,
    descuento: (o: IOrder) => (o.descuento > 0 ? `${o.descuento}%` : "—"),
    created_at: (o: IOrder) => formatOrderTime(o.created_at),
    status: (o: IOrder) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(o.status?.nombre)}`}>
            {o.status?.nombre ?? "—"}
        </span>
    ),
};

const actionsColumn: DataTableColumn<IOrder> = {
    accessor: "_acciones" as keyof IOrder,
    title: "Acciones",
    width: 200,
    render: (order: IOrder) => <OrderActionButtons order={order} />,
};

export const useOrderList = () => {
    const { sistemaId } = useAxios();
    const [fecha, setFecha] = useState<string | null>(null);
    const [estatusId, setEstatusId] = useState<number>(OrderStatusEnum.InProcess);

    const { dataTableProps, isLoading, refetch, setPage } = useDataTable({
        service: useIndexOrder,
        payload: {
            sistema_id: sistemaId,
            estatus_pedido_id: estatusId,
            ...(fecha ? { fecha } : {}),
        },
        renderersMap,
    });

    const enhancedDataTableProps = useMemo(
        () => ({
            ...dataTableProps,
            columns:
                dataTableProps.columns.length > 0
                    ? ([...dataTableProps.columns, actionsColumn] as DataTableColumn<IOrder>[])
                    : [],
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dataTableProps],
    );

    const handleFechaChange = (value: string | null) => {
        setFecha(value);
        setPage(1);
    };

    const handleEstatusChange = (value: number) => {
        setEstatusId(value);
        setPage(1);
    };

    const handleClearFilters = () => {
        setFecha(null);
        setEstatusId(OrderStatusEnum.InProcess);
        setPage(1);
    };

    return {
        dataTableProps: enhancedDataTableProps,
        isLoading,
        refetch,
        sistemaId,
        fecha,
        estatusId,
        handleFechaChange,
        handleEstatusChange,
        handleClearFilters,
    };
};

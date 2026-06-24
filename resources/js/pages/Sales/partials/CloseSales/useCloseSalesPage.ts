import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetActiveSale, useCloseSales, useCurrentTotalSale } from "@/services/useOpenSalesService";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

export const useCloseSalesPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: activeSale, isLoading: loadingSale } = useGetActiveSale();
    const sistemaId = activeSale?.id ?? 0;

    const { data: totalVentas, isLoading: loadingTotal } = useCurrentTotalSale(sistemaId);
    const { mutateAsync: closeSales, isPending: isClosing } = useCloseSales(sistemaId);

    const efectivoInicio = activeSale?.efectivo_caja_inicio ?? 0;
    const totalDia = (totalVentas as number) ?? 0;
    const efectivoCierre = efectivoInicio + totalDia;

    const handleClose = async () => {
        const result = await Swal.fire({
            title: "¿Cerrar caja?",
            text: "Esta acción cerrará la sesión de ventas del día. No podrás registrar más órdenes.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#78716c",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, cerrar caja",
            reverseButtons: true,
        });
        if (!result.isConfirmed) return;

        try {
            await closeSales({});
            queryClient.invalidateQueries({ queryKey: [`${ApiRoutes.System}/active-sale`] });
            toast.success("Caja cerrada exitosamente");
            navigate("/");
        } catch (error: any) {
            const msg = error?.response?.data?.message ?? "Error al cerrar la caja";
            toast.error(msg);
        }
    };

    return {
        activeSale,
        sistemaId,
        efectivoInicio,
        totalDia,
        efectivoCierre,
        isLoading: loadingSale || loadingTotal,
        isClosing,
        handleClose,
    };
};

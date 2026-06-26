import { useMutation } from "@tanstack/react-query";
import { axiosPOST } from "@/hooks/useApi";
import { useAxios } from "@/hooks/useAxios";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { useGetBusinessConfig } from "@/services/useBusinessConfigService";
import { toast } from "react-toastify";

export const usePrintTicket = (orderId: number) => {
    const { axiosApi } = useAxios();
    const { data: businessConfig } = useGetBusinessConfig();

    const { mutate: sendPrint, isPending } = useMutation({
        mutationFn: () =>
            axiosPOST(axiosApi, {
                url: `${ApiRoutes.Orders}/${orderId}/print`,
                data: {},
            }),
        onSuccess: () => toast.success("Ticket enviado a la impresora"),
        onError: () => toast.error("Impresora no disponible"),
    });

    const print = () => {
        if (!businessConfig?.printer_name?.trim()) {
            toast.warning("Impresora no configurada. Ve a Configuración → Impresora para agregarla.");
            return;
        }
        sendPrint();
    };

    return { print, isPending };
};

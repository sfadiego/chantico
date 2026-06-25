import { useMutation } from "@tanstack/react-query";
import { axiosPOST } from "@/hooks/useApi";
import { useAxios } from "@/hooks/useAxios";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { toast } from "react-toastify";

export const usePrintTicket = (orderId: number) => {
    const { axiosApi } = useAxios();

    const { mutate: print, isPending } = useMutation({
        mutationFn: () =>
            axiosPOST(axiosApi, {
                url: `${ApiRoutes.Orders}/${orderId}/print`,
                data: {},
            }),
        onSuccess: () => toast.success("Ticket enviado a la impresora"),
        onError: () => toast.error("Impresora no disponible"),
    });

    return { print, isPending };
};

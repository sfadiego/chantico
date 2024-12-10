import { useGetActiveSale } from "@/services/useOpenSalesService";

export const useActiveSale = () => {
    let { isLoading, data, refetch } = useGetActiveSale();
    return {
        showData: (!isLoading && data) && true,
        info: data?.data,
        isLoading,
        refetch
    }
}
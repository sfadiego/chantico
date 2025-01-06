import { useBestSeller } from "@/services/useStatisticsService"

export const useGetBestSeller = () => {
    const { isLoading, data, refetch } = useBestSeller()
    return {
        isLoading: isLoading,
        showData: (!isLoading && data) && true,
        data: data?.data,
        refetch
    }
}
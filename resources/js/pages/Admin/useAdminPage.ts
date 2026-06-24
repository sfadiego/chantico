import { useGetBusinessConfig } from "@/services/useBusinessConfigService";

export const useAdminPage = () => {
    const { data: config, isLoading } = useGetBusinessConfig();
    return { config, isLoading };
};

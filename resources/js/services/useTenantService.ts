import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApisEnum } from "@/configs/apisEnum";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { IBusinessConfig } from "@/models/IBusinessConfig";

const QUERY_KEY = "tenant-branding";

export const useGetTenantBranding = (slug: string) =>
    useQuery<IBusinessConfig>({
        queryKey: [QUERY_KEY, slug],
        queryFn: async () => {
            const url = `${ApisEnum.BaseUrl}${ApiRoutes.Tenant}/${slug}`;
            const res = await axios.get(url);
            return res.data.data as IBusinessConfig;
        },
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

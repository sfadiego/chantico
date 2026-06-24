import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGET, axiosPOST, axiosPUT, axiosDELETE } from "@/hooks/useApi";
import { useAxios } from "@/hooks/useAxios";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { IBusinessConfig } from "@/models/IBusinessConfig";

const url = ApiRoutes.BusinessConfig;
const QUERY_KEY = "business-config";

export const useGetBusinessConfig = () =>
    useGET<IBusinessConfig>({ url, nameQuery: QUERY_KEY });

export const useUpdateBusinessConfig = () => {
    const { axiosApi } = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Pick<IBusinessConfig, "business_name" | "primary_color" | "sidebar_color" | "font_color" | "label_color">) =>
            axiosPUT(axiosApi, { url, data }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    });
};

export const useUploadLogo = () => {
    const { axiosApi } = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => {
            const form = new FormData();
            form.append("logo", file);
            return axiosPOST(axiosApi, {
                url: `${url}/logo`,
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    });
};

export const useRemoveLogo = () => {
    const { axiosApi } = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => axiosDELETE(axiosApi, { url: `${url}/logo` }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    });
};

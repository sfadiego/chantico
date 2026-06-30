import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { superAdminAxios } from "@/contexts/SuperAdminContext";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { ICreateUserPayload, IUpdateUserPayload, IUser } from "@/models/IUser";

const baseUrl = (tenantId: number) => `${ApiRoutes.SuperAdminTenant}/${tenantId}/users`;
const QUERY_KEY = "tenant-users";

export const useListTenantUsers = (tenantId: number) =>
    useQuery<IUser[]>({
        queryKey: [QUERY_KEY, tenantId],
        queryFn: async () => {
            const res = await superAdminAxios.get(baseUrl(tenantId));
            return res.data.data as IUser[];
        },
        enabled: !!tenantId,
    });

export const useCreateTenantUser = (tenantId: number) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: ICreateUserPayload) =>
            superAdminAxios.post(baseUrl(tenantId), payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY, tenantId] }),
    });
};

export const useUpdateTenantUser = (tenantId: number) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: IUpdateUserPayload }) =>
            superAdminAxios.put(`${baseUrl(tenantId)}/${id}`, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY, tenantId] }),
    });
};

export const useDeleteTenantUser = (tenantId: number) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (userId: number) =>
            superAdminAxios.delete(`${baseUrl(tenantId)}/${userId}`),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY, tenantId] }),
    });
};

export const useSeedTenantUsers = (tenantId: number) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => superAdminAxios.post(`${baseUrl(tenantId)}/seed`),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY, tenantId] }),
    });
};

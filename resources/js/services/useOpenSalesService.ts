import { IMainOrderReport } from "@/models/IMainOrderReport";
import { useGET, usePOST } from "../hooks/useApi";
import { ISingleResponse } from "@/intefaces/ISingleResponse";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

const url = ApiRoutes.System;
export const useGetMainSalesIndex = () => useGET({ url: `${url}` });
export const useGetActiveSale = () =>
    useGET<ISingleResponse<IMainOrderReport>>({
        url: `${url}/active-sale`,
    });
export const useStoreOpenSales = () => usePOST({ url: `${url}/open` });
export const useCloseSales = (systemId: number) =>
    usePOST({ url: `${url}/${systemId}/close` });
export const useTotalCloseSales = (systemId: number) =>
    useGET({ url: `${url}/${systemId}/total-close-sales` });

export const useDetailOfCloseSales = (systemId: number) =>
    useGET({ url: `${url}/${systemId}/detail-close-sales` });

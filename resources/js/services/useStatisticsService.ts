import { useGET } from "../hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

export interface IBestSellerItem {
    id: number;
    product: string;
    total: number;
}

const url = ApiRoutes.Statistics;
export const useBestSeller = (date?: string) =>
    useGET<IBestSellerItem[]>({
        url: `${url}/best-seller`,
        nameQuery: `${url}/best-seller`,
        filters: date ? { date } : {},
    });

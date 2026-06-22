import { useGET } from "../hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

const url = ApiRoutes.Statistics;
export const useBestSeller = () => useGET({ url: `${url}/best-seller` });

import { useGET } from "../hooks/useApi";

const url = "admin/system";
export const useBestSeller = () => useGET({ url: `${url}/statistics/best-seller` });

import { useGET } from "../hooks/useApi"

export const useBestSeller = () => useGET({ url: 'admin/system/statistics/best-seller' })

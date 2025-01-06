import { useGet } from "../hooks/useApi"

export const useBestSeller = () => useGet({ url: 'admin/system/statistics/best-seller' })

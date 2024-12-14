import { useGet, usePost, usePUT } from "../hooks/useApi";

export const useGetActiveSale = () => useGet({ url: `admin/system/active-sale` })
export const useStoreOpenSales = () => usePost({ url: `admin/system/open` })
export const useCloseSales = (systemId: number) => usePost({ url: `admin/system/${systemId}/close` })
export const useTotalCloseSales = (systemId: number) => useGet({ url: `admin/system/${systemId}/total-close-sales` })

import { useGet, usePost, usePUT } from "../hooks/useApi";


export const useGetActiveSale = () => useGet({ url: `admin/system/active-sale` })
export const useOpenSalesInfo = (systemId: number) => usePUT({ url: `admin/system/${systemId}/total-close-sales` })
export const useStoreOpenSales = () => usePost({ url: `admin/system/open` })
export const useCloseSales = (systemId: number) => usePUT({ url: `admin/system/${systemId}/close` })
export const useTotalCloseSales = (systemId: number) => usePUT({ url: `admin/system/${systemId}/total-close-sales` })

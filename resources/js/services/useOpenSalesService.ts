import { useGET, usePOST, usePUT } from "../hooks/useApi";

export const useGetMainSalesIndex = () => useGET({ url: `admin/system` })
export const useGetActiveSale = () => useGET({ url: `admin/system/active-sale` })
export const useStoreOpenSales = () => usePOST({ url: `admin/system/open` })
export const useCloseSales = (systemId: number) => usePOST({ url: `admin/system/${systemId}/close` })
export const useTotalCloseSales = (systemId: number) => useGET({ url: `admin/system/${systemId}/total-close-sales` })
export const useDetailOfCloseSales = (systemId: number) => useGET({ url: `admin/system/${systemId}/detail-close-sales` })

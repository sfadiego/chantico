import { useGet } from "../hooks/useApi";

export const useIndexOrder = () => useGet({ url: 'order' })
export const useShowOrder = (orderId: number) => useGet({ url: `order/${orderId}` })
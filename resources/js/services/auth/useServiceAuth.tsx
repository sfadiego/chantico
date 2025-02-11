import { usePOST } from "@/hooks/useApi"

export const useServiceLogin = () => usePOST({ url: 'auth/login' })
export const useServiceRegister = () => usePOST({ url: 'auth/register' })
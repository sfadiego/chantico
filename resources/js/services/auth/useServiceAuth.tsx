import { usePost } from "@/hooks/useApi"

export const useServiceLogin = () => usePost({ url: '/auth/login' })
export const useServiceRegister = () => usePost({ url: '/auth/register' })
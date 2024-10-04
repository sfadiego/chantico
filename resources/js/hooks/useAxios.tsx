import { useContext } from "react"
import { AxiosContext } from '../contexts/AxiosContext'

export const useAxios = () => {
    const context = useContext(AxiosContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}
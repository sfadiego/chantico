import { useContext } from "react"
import { TakeOrderContext } from "@/contexts/TakeOrderContext";

export const useTakeOrder = () => {
    const context = useContext(TakeOrderContext);
    if (context === undefined) {
        throw new Error('cant load TakeOrdercontext')
    }
    return context;
}
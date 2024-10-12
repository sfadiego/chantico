import { ITakeOrderContext } from "@/contexts/interfaces/ITakeOrderContext"
import { createContext, ReactNode, useEffect, useState } from "react"


export const TakeOrderContext = createContext<ITakeOrderContext | undefined>(undefined)
interface ITakeOrderProviderProps {
    children: ReactNode
}

export const TakeOrderProvider = ({ children }: ITakeOrderProviderProps) => {
    const [categoryId, setCategoryId] = useState<number>(0);
    const selectCategory = (categoryId: number) => setCategoryId(categoryId);
   
    const value = {
        categoryId,
        selectCategory,
    }

    return <TakeOrderContext.Provider value={value}> {children} </TakeOrderContext.Provider>
}
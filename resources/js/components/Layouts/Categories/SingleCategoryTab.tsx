import { useTakeOrder } from "@/hooks/useTakeOrder";
import { ICategory } from "@/intefaces/ICategory"
import { useCallback } from "react";

export const SingleCategoryTab = ({ nombre, id }: ICategory) => {
    const { selectCategory } = useTakeOrder();
    const handleSelectedCategory = useCallback(() => id !== undefined && selectCategory(id), [id, selectCategory]);

    return (
        <div role="button" onClick={handleSelectedCategory} className="p-2 ms-1 border">
            {nombre}
        </div>

    )
}

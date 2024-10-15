import { ICategory } from "@/intefaces/ICategory"

export const SingleCategoryTab = ({ nombre, id, selectCategory }: ICategory) => {

    return (
        <div role="button" onClick={() => selectCategory(id!!)} className="p-2 ms-1 border">
            {nombre}
        </div>

    )
}

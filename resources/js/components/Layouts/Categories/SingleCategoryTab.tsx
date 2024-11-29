import { ICategory } from "@/intefaces/ICategory"

export const SingleCategoryTab = ({ nombre, id, activeTab, selectCategory, setactiveTab }: ICategory) => {

    return (
        <div role="button" onClick={() => {
            selectCategory(id!!)
            setactiveTab(id!!)
        }} className={`p-2 ms-1 border ${activeTab == id ? 'bg-warning-subtle' : ''}`}>
            {nombre}
        </div>

    )
}

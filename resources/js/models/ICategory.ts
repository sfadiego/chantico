export interface ICategory {
    id?: number;
    nombre: string;
    orden?: number;
    foto_id?: number;
    icon_name?: string;
    selectCategory: (category: number) => void;
    setactiveTab: (id: number) => void;
    activeTab: number;
}

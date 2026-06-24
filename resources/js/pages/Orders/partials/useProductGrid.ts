import { useState, useMemo } from "react";
import { IProduct } from "@/models/IProduct";

export type CategoryOption = {
    name: string;
    count: number;
    icon?: string;
};

export const useProductGrid = (products: IProduct[]) => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Todos");

    const activeProducts = useMemo(() => products.filter((p) => p.activo), [products]);

    const categories = useMemo((): CategoryOption[] => {
        const names = Array.from(
            new Set(activeProducts.map((p) => p.category?.nombre).filter(Boolean) as string[]),
        );
        return [
            { name: "Todos", count: activeProducts.length },
            ...names.map((name) => {
                const sample = activeProducts.find((p) => p.category?.nombre === name);
                return {
                    name,
                    count: activeProducts.filter((p) => p.category?.nombre === name).length,
                    icon: sample?.category?.icon_name,
                };
            }),
        ];
    }, [activeProducts]);

    const filtered = useMemo(
        () =>
            activeProducts.filter((p) => {
                const matchCat =
                    activeCategory === "Todos" || p.category?.nombre === activeCategory;
                const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
                return matchCat && matchSearch;
            }),
        [activeProducts, activeCategory, search],
    );

    return { search, setSearch, activeCategory, setActiveCategory, categories, filtered };
};

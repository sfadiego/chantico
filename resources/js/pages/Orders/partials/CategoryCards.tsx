import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CategoryOption } from "./useProductGrid";

interface CategoryCardsProps {
    categories: CategoryOption[];
    activeCategory: string;
    onSelect: (name: string) => void;
}

export const CategoryCards = ({ categories, activeCategory, onSelect }: CategoryCardsProps) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {categories.map((cat) => (
            <CategoryCard
                key={cat.name}
                category={cat}
                isActive={activeCategory === cat.name}
                onSelect={onSelect}
            />
        ))}
    </div>
);

interface CategoryCardProps {
    category: CategoryOption;
    isActive: boolean;
    onSelect: (name: string) => void;
}

const CategoryCard = ({ category, isActive, onSelect }: CategoryCardProps) => (
    <button
        onClick={() => onSelect(category.name)}
        className={`flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all duration-150 active:scale-95 ${
            isActive
                ? "border-amber-400 bg-amber-50"
                : "border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50"
        }`}
    >
        <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? "bg-amber-100" : "bg-stone-100"
            }`}
        >
            <DynamicIcon
                name={category.icon ?? "Tag"}
                size={16}
                className={isActive ? "text-amber-600" : "text-stone-500"}
            />
        </div>
        <div>
            <p
                className={`text-xs font-semibold leading-tight ${
                    isActive ? "text-amber-700" : "text-stone-700"
                }`}
            >
                {category.name}
            </p>
            <p
                className={`text-xs tabular-nums mt-0.5 ${
                    isActive ? "text-amber-500" : "text-stone-400"
                }`}
            >
                {category.count} {category.count === 1 ? "prod." : "prods."}
            </p>
        </div>
    </button>
);

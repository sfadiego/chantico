import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CategoryOption } from "./useProductGrid";

interface CategoryPillsProps {
    categories: CategoryOption[];
    activeCategory: string;
    onSelect: (name: string) => void;
}

export const CategoryPills = ({ categories, activeCategory, onSelect }: CategoryPillsProps) => (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
                <button
                    key={cat.name}
                    onClick={() => onSelect(cat.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 flex-shrink-0 ${
                        isActive
                            ? "border-transparent text-white"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                    }`}
                    style={isActive ? { backgroundColor: "var(--color-primary)" } : undefined}
                >
                    <DynamicIcon
                        name={cat.icon ?? "Tag"}
                        size={13}
                        className={isActive ? "text-white" : "text-stone-400"}
                    />
                    {cat.name}
                    <span
                        className={`text-xs tabular-nums ${
                            isActive ? "text-white/70" : "text-stone-400"
                        }`}
                    >
                        {cat.count}
                    </span>
                </button>
            );
        })}
    </div>
);

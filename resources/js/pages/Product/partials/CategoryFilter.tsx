import { ICategory } from "@/models/ICategory";

interface CategoryFilterProps {
    categories: ICategory[];
    selected: number | null;
    onChange: (id: number | null) => void;
}

export const CategoryFilter = ({ categories, selected, onChange }: CategoryFilterProps) => (
    <div className="flex flex-wrap gap-2">
        <Chip active={selected === null} onClick={() => onChange(null)}>
            Todos
        </Chip>
        {categories.map((cat) => (
            <Chip
                key={cat.id}
                active={selected === cat.id}
                onClick={() => onChange(cat.id!)}
            >
                {cat.nombre}
            </Chip>
        ))}
    </div>
);

const Chip = ({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            active
                ? "bg-amber-500 text-white shadow-sm shadow-amber-200"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        }`}
    >
        {children}
    </button>
);

import { Search, Package, Loader } from "lucide-react";
import { IProduct } from "@/models/IProduct";
import { CartItem } from "../useTakeOrder";
import { CategoryOption, useProductGrid } from "./useProductGrid";

interface ProductGridProps {
    products: IProduct[];
    isLoading: boolean;
    cart: CartItem[];
    onAdd: (productId: number, name: string, price: number) => void;
}

export const ProductGrid = ({ products, isLoading, cart, onAdd }: ProductGridProps) => {
    const { search, setSearch, activeCategory, setActiveCategory, categories, filtered } =
        useProductGrid(products);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="px-4 pt-4 pb-3 bg-white border-b border-stone-100 flex-shrink-0">
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-stone-400">
                        <Loader size={24} className="animate-spin" />
                    </div>
                ) : (
                    <div className="p-4 space-y-5">
                        <CategoryCards
                            categories={categories}
                            activeCategory={activeCategory}
                            onSelect={setActiveCategory}
                        />

                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-stone-400">
                                <Package size={32} className="mb-2 opacity-40" />
                                <p className="text-sm">No se encontraron productos</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                {filtered.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        cartItem={cart.find((i) => i.id === product.id)}
                                        onAdd={onAdd}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

interface CategoryCardsProps {
    categories: CategoryOption[];
    activeCategory: string;
    onSelect: (name: string) => void;
}

const CategoryCards = ({ categories, activeCategory, onSelect }: CategoryCardsProps) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {categories.map((cat) => (
            <button
                key={cat.name}
                onClick={() => onSelect(cat.name)}
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-left transition-all duration-150 active:scale-95 ${
                    activeCategory === cat.name
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50"
                }`}
            >
                <span
                    className={`text-xs font-semibold leading-tight ${
                        activeCategory === cat.name ? "text-amber-700" : "text-stone-700"
                    }`}
                >
                    {cat.name}
                </span>
                <span
                    className={`text-xs tabular-nums ${
                        activeCategory === cat.name ? "text-amber-500" : "text-stone-400"
                    }`}
                >
                    {cat.count} {cat.count === 1 ? "producto" : "productos"}
                </span>
            </button>
        ))}
    </div>
);

interface ProductCardProps {
    product: IProduct;
    cartItem: CartItem | undefined;
    onAdd: (productId: number, name: string, price: number) => void;
}

const ProductCard = ({ product, cartItem, onAdd }: ProductCardProps) => (
    <button
        onClick={() => onAdd(product.id, product.nombre, product.precio)}
        className={`relative bg-white rounded-xl border-2 p-4 text-left hover:shadow-md transition-all duration-150 active:scale-95 ${
            cartItem ? "border-amber-400 shadow-sm" : "border-stone-100 hover:border-amber-200"
        }`}
    >
        {cartItem && (
            <span className="absolute top-2 right-2 w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center font-bold leading-none">
                {cartItem.quantity}
            </span>
        )}
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-2">
            <Package size={16} className="text-amber-500" />
        </div>
        <p className="text-stone-900 font-medium text-sm leading-tight">{product.nombre}</p>
        <p className="text-amber-600 font-bold text-sm mt-1">${product.precio}</p>
    </button>
);

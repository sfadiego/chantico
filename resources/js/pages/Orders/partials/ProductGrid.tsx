import { Search, Package, Loader } from "lucide-react";
import { IProduct } from "@/models/IProduct";
import { CartItem } from "../useTakeOrder";
import { useProductGrid } from "./useProductGrid";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
    products: IProduct[];
    isLoading: boolean;
    cart: CartItem[];
    isReadOnly?: boolean;
    onAdd: (productId: number, name: string, price: number) => void;
}

export const ProductGrid = ({ products, isLoading, cart, isReadOnly = false, onAdd }: ProductGridProps) => {
    const { search, setSearch, activeCategory, setActiveCategory, categories, filtered } =
        useProductGrid(products);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Buscador + Tabs — fijos, no hacen scroll */}
            <div className="flex-shrink-0 bg-white border-b border-stone-100">
                <div className="px-4 pt-4 pb-3">
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
                <div className="px-3 pb-3">
                    <CategoryTabs
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>
            </div>

            {/* Productos — área con scroll */}
            <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-stone-400">
                        <Loader size={24} className="animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
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
                                isReadOnly={isReadOnly}
                                onAdd={onAdd}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

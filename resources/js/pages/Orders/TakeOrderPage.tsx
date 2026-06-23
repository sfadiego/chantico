import { useState } from "react";
import { ShoppingCart, ChevronLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIndexProducts } from "@/services/useProductService";
import { useTakeOrder } from "./useTakeOrder";
import { ProductGrid } from "./partials/ProductGrid";
import { CartPanel } from "./partials/CartPanel";

export default function TakeOrderPage() {
    const navigate = useNavigate();
    const [mobileTab, setMobileTab] = useState<"products" | "cart">("products");

    const { order, cart, cartCount, addToCart, updateQuantity, removeFromCart, clearCart } =
        useTakeOrder();

    const { data: productsPage, isLoading: loadingProducts } = useIndexProducts({ limit: 200 });
    const products = productsPage?.data ?? [];

    return (
        <div className="flex flex-col h-full">
            {/* Desktop */}
            <div className="hidden lg:flex flex-col h-full overflow-hidden">
                <Header
                    title={order?.nombre_pedido ?? "Tomar pedido"}
                    onBack={() => navigate(-1)}
                />
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-hidden bg-stone-50 border-r border-stone-200">
                        <ProductGrid
                            products={products}
                            isLoading={loadingProducts}
                            cart={cart}
                            onAdd={addToCart}
                        />
                    </div>
                    <div className="w-80 xl:w-96 flex-shrink-0 overflow-hidden flex flex-col">
                        <CartPanel
                            order={order}
                            cart={cart}
                            onUpdate={updateQuantity}
                            onRemove={removeFromCart}
                            onClear={clearCart}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex flex-col h-full overflow-hidden">
                <Header
                    title={order?.nombre_pedido ?? "Tomar pedido"}
                    onBack={() => navigate(-1)}
                    compact
                />
                <div className="flex-1 overflow-hidden">
                    {mobileTab === "products" ? (
                        <ProductGrid
                            products={products}
                            isLoading={loadingProducts}
                            cart={cart}
                            onAdd={addToCart}
                        />
                    ) : (
                        <CartPanel
                            order={order}
                            cart={cart}
                            onUpdate={updateQuantity}
                            onRemove={removeFromCart}
                            onClear={clearCart}
                        />
                    )}
                </div>
                <MobileTabBar
                    activeTab={mobileTab}
                    cartCount={cartCount}
                    onTabChange={setMobileTab}
                />
            </div>
        </div>
    );
}

interface HeaderProps {
    title: string;
    onBack: () => void;
    compact?: boolean;
}

const Header = ({ title, onBack, compact = false }: HeaderProps) => (
    <div
        className={`bg-white border-b border-stone-200 flex items-center gap-3 flex-shrink-0 ${
            compact ? "px-4 py-3.5" : "px-6 py-4"
        }`}
    >
        <button
            onClick={onBack}
            className={`p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors ${compact ? "-ml-1" : ""}`}
        >
            <ChevronLeft size={20} />
        </button>
        <div>
            <h1 className={`font-semibold text-stone-900 ${compact ? "text-sm" : ""}`}>
                {title}
            </h1>
            {!compact && (
                <p className="text-stone-400 text-xs">Selecciona los productos del menú</p>
            )}
        </div>
    </div>
);

interface MobileTabBarProps {
    activeTab: "products" | "cart";
    cartCount: number;
    onTabChange: (tab: "products" | "cart") => void;
}

const MobileTabBar = ({ activeTab, cartCount, onTabChange }: MobileTabBarProps) => (
    <div className="bg-white border-t border-stone-200 flex flex-shrink-0 safe-area-bottom">
        <button
            onClick={() => onTabChange("products")}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors ${
                activeTab === "products" ? "text-amber-600" : "text-stone-400"
            }`}
        >
            <Package size={20} />
            Productos
        </button>
        <button
            onClick={() => onTabChange("cart")}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors relative ${
                activeTab === "cart" ? "text-amber-600" : "text-stone-400"
            }`}
        >
            <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                        {cartCount > 9 ? "9+" : cartCount}
                    </span>
                )}
            </div>
            Pedido
        </button>
    </div>
);

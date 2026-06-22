import { useState, useMemo } from "react";
import {
    Plus,
    Minus,
    Trash2,
    ShoppingCart,
    ChevronLeft,
    Printer,
    Tag,
    Search,
    Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    emoji: string;
};

const CATEGORIES = ["Todos", "Bebidas", "Comida", "Postres"];

const PRODUCTS: Product[] = [
    { id: 1, name: "Cappuccino", price: 45, category: "Bebidas", emoji: "☕" },
    { id: 2, name: "Americano", price: 35, category: "Bebidas", emoji: "☕" },
    { id: 3, name: "Latte", price: 50, category: "Bebidas", emoji: "🥛" },
    { id: 4, name: "Frappuccino", price: 65, category: "Bebidas", emoji: "🧋" },
    { id: 5, name: "Jugo de naranja", price: 30, category: "Bebidas", emoji: "🍊" },
    { id: 6, name: "Agua mineral", price: 20, category: "Bebidas", emoji: "💧" },
    { id: 7, name: "Sándwich jamón", price: 65, category: "Comida", emoji: "🥪" },
    { id: 8, name: "Croissant", price: 35, category: "Comida", emoji: "🥐" },
    { id: 9, name: "Ensalada César", price: 85, category: "Comida", emoji: "🥗" },
    { id: 10, name: "Quesadilla", price: 70, category: "Comida", emoji: "🫓" },
    { id: 11, name: "Pasta primavera", price: 90, category: "Comida", emoji: "🍝" },
    { id: 12, name: "Pastel chocolate", price: 55, category: "Postres", emoji: "🍰" },
    { id: 13, name: "Cheesecake", price: 65, category: "Postres", emoji: "🍮" },
    { id: 14, name: "Brownie", price: 40, category: "Postres", emoji: "🍫" },
];

interface ProductGridProps {
    cart: CartItem[];
    onAdd: (product: Product) => void;
}

function ProductGrid({ cart, onAdd }: ProductGridProps) {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [search, setSearch] = useState("");

    const filtered = useMemo(
        () =>
            PRODUCTS.filter((p) => {
                const matchCat = activeCategory === "Todos" || p.category === activeCategory;
                const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
                return matchCat && matchSearch;
            }),
        [activeCategory, search],
    );

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 bg-white border-b border-stone-100 space-y-3 flex-shrink-0">
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
                <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === cat
                                    ? "bg-amber-500 text-white"
                                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-stone-400">
                        <Package size={32} className="mb-2 opacity-40" />
                        <p className="text-sm">No se encontraron productos</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        {filtered.map((product) => {
                            const inCart = cart.find((i) => i.id === product.id);
                            return (
                                <button
                                    key={product.id}
                                    onClick={() => onAdd(product)}
                                    className={`relative bg-white rounded-xl border-2 p-4 text-left hover:shadow-md transition-all duration-150 active:scale-95 ${
                                        inCart
                                            ? "border-amber-400 shadow-sm"
                                            : "border-stone-100 hover:border-amber-200"
                                    }`}
                                >
                                    {inCart && (
                                        <span className="absolute top-2 right-2 w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center font-bold leading-none">
                                            {inCart.quantity}
                                        </span>
                                    )}
                                    <span className="text-3xl block mb-2 leading-none">
                                        {product.emoji}
                                    </span>
                                    <p className="text-stone-900 font-medium text-sm leading-tight">
                                        {product.name}
                                    </p>
                                    <p className="text-amber-600 font-bold text-sm mt-1">
                                        ${product.price}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

interface CartPanelProps {
    cart: CartItem[];
    onUpdate: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    onClear: () => void;
}

function CartPanel({ cart, onUpdate, onRemove, onClear }: CartPanelProps) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="font-semibold text-stone-900">Pedido #001</h2>
                    <p className="text-stone-400 text-xs mt-0.5">
                        {cartCount === 0
                            ? "Sin artículos"
                            : `${cartCount} ${cartCount === 1 ? "artículo" : "artículos"}`}
                    </p>
                </div>
                {cart.length > 0 && (
                    <button
                        onClick={onClear}
                        className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-stone-400 py-12">
                        <ShoppingCart size={38} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">El pedido está vacío</p>
                        <p className="text-xs mt-1 text-stone-400">
                            Selecciona productos del menú
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 py-3 border-b border-stone-100 last:border-0"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-stone-900 text-sm font-medium truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-stone-400 text-xs">${item.price} c/u</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onUpdate(item.id, -1)}
                                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                                    >
                                        <Minus size={12} className="text-stone-600" />
                                    </button>
                                    <span className="w-6 text-center text-sm font-bold text-stone-900 tabular-nums">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => onUpdate(item.id, 1)}
                                        className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
                                    >
                                        <Plus size={12} className="text-amber-700" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 ml-1">
                                    <span className="text-stone-900 font-semibold text-sm w-14 text-right tabular-nums">
                                        ${item.price * item.quantity}
                                    </span>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="text-stone-300 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-5 py-4 border-t border-stone-100 bg-stone-50 flex-shrink-0">
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Subtotal</span>
                        <span className="text-stone-700 tabular-nums">${subtotal}.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500 flex items-center gap-1.5">
                            <Tag size={13} />
                            Descuento
                        </span>
                        <span className="text-stone-700">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                        <span className="font-bold text-stone-900">Total</span>
                        <span className="font-bold text-stone-900 text-lg tabular-nums">
                            ${subtotal}.00
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <button
                        disabled={cart.length === 0}
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                        Guardar pedido
                    </button>
                    <button
                        disabled={cart.length === 0}
                        className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 font-medium py-2.5 rounded-xl transition-colors text-sm"
                    >
                        <Printer size={15} />
                        Imprimir ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TakeOrderPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [mobileTab, setMobileTab] = useState<"products" | "cart">("products");

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + delta } : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex flex-col h-full">
            {/* Desktop layout */}
            <div className="hidden lg:flex flex-col h-full overflow-hidden">
                <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={() => navigate("/")}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-semibold text-stone-900">Tomar pedido</h1>
                        <p className="text-stone-400 text-xs">Selecciona los productos del menú</p>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-hidden bg-stone-50 border-r border-stone-200">
                        <ProductGrid cart={cart} onAdd={addToCart} />
                    </div>
                    <div className="w-80 xl:w-96 flex-shrink-0 overflow-hidden flex flex-col">
                        <CartPanel
                            cart={cart}
                            onUpdate={updateQuantity}
                            onRemove={removeFromCart}
                            onClear={() => setCart([])}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden flex flex-col h-full overflow-hidden">
                <div className="bg-white border-b border-stone-200 px-4 py-3.5 flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => navigate("/")}
                        className="p-1.5 -ml-1 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="font-semibold text-stone-900 text-sm">Tomar pedido</h1>
                </div>

                <div className="flex-1 overflow-hidden">
                    {mobileTab === "products" ? (
                        <ProductGrid cart={cart} onAdd={addToCart} />
                    ) : (
                        <CartPanel
                            cart={cart}
                            onUpdate={updateQuantity}
                            onRemove={removeFromCart}
                            onClear={() => setCart([])}
                        />
                    )}
                </div>

                <div className="bg-white border-t border-stone-200 flex flex-shrink-0 safe-area-bottom">
                    <button
                        onClick={() => setMobileTab("products")}
                        className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors ${
                            mobileTab === "products" ? "text-amber-600" : "text-stone-400"
                        }`}
                    >
                        <Package size={20} />
                        Productos
                    </button>
                    <button
                        onClick={() => setMobileTab("cart")}
                        className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors relative ${
                            mobileTab === "cart" ? "text-amber-600" : "text-stone-400"
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
            </div>
        </div>
    );
}

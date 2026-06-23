import { Plus, Minus, Trash2, ShoppingCart, Printer, Tag } from "lucide-react";
import { IOrder } from "@/models/IOrder";
import { CartItem } from "../useTakeOrder";

interface CartPanelProps {
    order: IOrder | undefined;
    cart: CartItem[];
    onUpdate: (productId: number, delta: number) => void;
    onRemove: (productId: number) => void;
    onClear: () => void;
}

export const CartPanel = ({ order, cart, onUpdate, onRemove, onClear }: CartPanelProps) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="font-semibold text-stone-900">
                        {order?.nombre_pedido ?? "Pedido"}
                    </h2>
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
                    <CartEmptyState />
                ) : (
                    <div className="space-y-1">
                        {cart.map((item) => (
                            <CartItemRow
                                key={item.id}
                                item={item}
                                onUpdate={onUpdate}
                                onRemove={onRemove}
                            />
                        ))}
                    </div>
                )}
            </div>

            <CartFooter
                subtotal={subtotal}
                hasItems={cart.length > 0}
            />
        </div>
    );
};

const CartEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-stone-400 py-12">
        <ShoppingCart size={38} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">El pedido está vacío</p>
        <p className="text-xs mt-1 text-stone-400">Selecciona productos del menú</p>
    </div>
);

interface CartItemRowProps {
    item: CartItem;
    onUpdate: (productId: number, delta: number) => void;
    onRemove: (productId: number) => void;
}

const CartItemRow = ({ item, onUpdate, onRemove }: CartItemRowProps) => (
    <div className="flex items-center gap-3 py-3 border-b border-stone-100 last:border-0">
        <div className="flex-1 min-w-0">
            <p className="text-stone-900 text-sm font-medium truncate">{item.name}</p>
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
);

interface CartFooterProps {
    subtotal: number;
    hasItems: boolean;
}

const CartFooter = ({ subtotal, hasItems }: CartFooterProps) => (
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
                disabled={!hasItems}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
                Guardar pedido
            </button>
            <button
                disabled={!hasItems}
                className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 font-medium py-2.5 rounded-xl transition-colors text-sm"
            >
                <Printer size={15} />
                Imprimir ticket
            </button>
        </div>
    </div>
);

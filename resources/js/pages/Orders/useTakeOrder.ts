import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShowOrder, useIndexOrderProducts } from "@/services/useOrderService";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

export const useTakeOrder = () => {
    const { id } = useParams<{ id: string }>();
    const orderId = Number(id);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartSeeded, setCartSeeded] = useState(false);

    const { data: order, isLoading: loadingOrder } = useShowOrder(orderId);
    const { data: orderProducts } = useIndexOrderProducts(orderId);

    useEffect(() => {
        if (cartSeeded || !orderProducts?.length) return;
        setCart(
            orderProducts.map((op) => ({
                id: op.producto_id,
                name: op.product.nombre,
                price: op.precio,
                quantity: op.cantidad,
            })),
        );
        setCartSeeded(true);
    }, [orderProducts, cartSeeded]);

    const addToCart = (productId: number, name: string, price: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === productId);
            if (existing) {
                return prev.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }
            return [...prev, { id: productId, name, price, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity + delta } : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        orderId,
        order,
        loadingOrder,
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };
};

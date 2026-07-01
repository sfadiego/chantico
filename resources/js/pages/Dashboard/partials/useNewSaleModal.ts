import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useAxios } from "@/hooks/useAxios";
import { useIndexProducts } from "@/services/useProductService";
import { useNewSale, ICartItem } from "@/services/useNewSaleService";
import { IProduct } from "@/models/IProduct";
import { UnidadMedidaEnum } from "@/enums/UnidadMedidaEnum";

export const useNewSaleModal = (onClose: () => void) => {
    const { sistemaId } = useAxios();
    const [search, setSearch] = useState("");
    const [nombrePedido, setNombrePedido] = useState("");
    const [cart, setCart] = useState<ICartItem[]>([]);

    const { data: productsData, isLoading: productsLoading } = useIndexProducts({
        page: 1,
        limit: 100,
        order: "asc",
    });

    const mutation = useNewSale();

    const products = useMemo(() => {
        const all = productsData?.data?.filter((p) => p.activo) ?? [];
        if (!search.trim()) return all;
        const q = search.toLowerCase();
        return all.filter((p) => p.nombre.toLowerCase().includes(q));
    }, [productsData, search]);

    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.product.precio * item.cantidad, 0),
        [cart],
    );

    const defaultCantidad = (product: IProduct) =>
        product.unidad_medida === UnidadMedidaEnum.Kg ? 0.5 : 1;

    const addToCart = (product: IProduct) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id
                        ? { ...i, cantidad: i.cantidad + defaultCantidad(product) }
                        : i,
                );
            }
            return [...prev, { product, cantidad: defaultCantidad(product) }];
        });
    };

    const updateCantidad = (productId: number, cantidad: number) => {
        if (cantidad <= 0) {
            setCart((prev) => prev.filter((i) => i.product.id !== productId));
            return;
        }
        setCart((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, cantidad } : i)),
        );
    };

    const removeFromCart = (productId: number) =>
        setCart((prev) => prev.filter((i) => i.product.id !== productId));

    const clearCart = () => setCart([]);

    const handleSubmit = async () => {
        if (!sistemaId || cart.length === 0) return;
        try {
            const now = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            const fallback = `VTA-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
            await mutation.mutateAsync({ sistemaId, nombrePedido: nombrePedido.trim() || fallback, items: cart });
            toast.success("Venta registrada correctamente.");
            onClose();
        } catch {
            toast.error("Error al registrar la venta.");
        }
    };

    return {
        search,
        setSearch,
        products,
        productsLoading,
        cart,
        total,
        addToCart,
        updateCantidad,
        removeFromCart,
        clearCart,
        nombrePedido,
        setNombrePedido,
        handleSubmit,
        isPending: mutation.isPending,
    };
};

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { contactInfo } from "../data/catalog";
import { formatCurrency } from "./format";
import type { CartItem, Product } from "../types/catalog";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  buildWhatsAppOrderUrl: (notes?: string) => string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toast: string | null;
  dismissToast: () => void;
};

const storageKey = "vip-auto-cart";
const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue) as CartItem[];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.product.id === product.id);

        if (!existingItem) {
          return [...currentItems, { product, quantity }];
        }

        return currentItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      });
      showToast(`${product.name} ajouté au panier`);
    },
    [showToast],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  const buildWhatsAppOrderUrl = useCallback(
    (notes?: string) => {
      const orderLines = items
        .map(
          (item) =>
            `- ${item.product.name} x${item.quantity} : ${formatCurrency(
              item.product.price * item.quantity,
              item.product.currency,
            )}`,
        )
        .join("\n");
      const message = [
        "Bonjour VIP AUTO, je souhaite commander :",
        orderLines,
        "",
        `Total : ${formatCurrency(subtotal, "XOF")}`,
        notes ? `\n${notes}` : "",
        "Merci de me confirmer la disponibilité et les modalités de retrait ou de livraison.",
      ]
        .filter(Boolean)
        .join("\n");

      return `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    },
    [items, subtotal],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      buildWhatsAppOrderUrl,
      isCartOpen,
      openCart,
      closeCart,
      toast,
      dismissToast,
    }),
    [
      addItem,
      buildWhatsAppOrderUrl,
      clearCart,
      closeCart,
      dismissToast,
      isCartOpen,
      itemCount,
      items,
      openCart,
      removeItem,
      subtotal,
      toast,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

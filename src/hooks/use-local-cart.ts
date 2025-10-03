import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
}

export interface LocalCart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const CART_STORAGE_KEY = 'local_cart';

// Helper function to get initial cart state from localStorage
const getInitialCartState = (): LocalCart => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      console.log('Loading cart from localStorage:', parsedCart);
      return parsedCart;
    }
  } catch (error) {
    console.error('Failed to parse saved cart:', error);
  }
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};

export function useLocalCart() {
  const [cart, setCart] = useState<LocalCart>(getInitialCartState);

  // Load cart from localStorage on mount (as backup)
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('useEffect: Loading cart from localStorage:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  }, [cart]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      console.log('Cart update event received:', event.detail);
      setCart(event.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const addToCart = (productId: string, name: string, price: number, image: string, variantId?: string) => {
    console.log('Local cart addToCart called:', { productId, name, price, image, variantId });
    
    // Force a synchronous update to ensure immediate state change
    setCart(prevCart => {
      console.log('Previous cart state:', prevCart);
      const existingItem = prevCart.items.find(item => 
        item.productId === productId && item.variantId === variantId
      );

      let newItems;
      if (existingItem) {
        // Update quantity if item already exists
        newItems = prevCart.items.map(item =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Updated existing item quantity');
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${productId}-${variantId || 'default'}-${Date.now()}`,
          productId,
          name,
          price,
          quantity: 1,
          image,
          variantId,
        };
        newItems = [...prevCart.items, newItem];
        console.log('Added new item:', newItem);
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const newCart = {
        items: newItems,
        totalItems,
        totalPrice,
      };
      console.log('New cart state:', newCart);
      
      // Force immediate localStorage update
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
      
      return newCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

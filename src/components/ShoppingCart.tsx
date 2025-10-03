import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useActiveOrder, useRemoveFromCart, useUpdateCartQuantity, useCartSummary } from '@/hooks/use-vendure';
import { useLocalCart } from '@/hooks/use-local-cart';
import { useCartContext } from '@/contexts/CartContext';

const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { setIsCartOpen } = useCartContext();
  const navigate = useNavigate();
  
  // Vendure hooks
  const { data: activeOrder, isLoading, error } = useActiveOrder();
  const { totalItems, totalPrice, currencyCode } = useCartSummary();
  const removeFromCartMutation = useRemoveFromCart();
  const updateQuantityMutation = useUpdateCartQuantity();
  
  // Local cart as fallback
  const { cart: localCart, addToCart: addToLocalCart, removeFromCart: removeFromLocalCart, updateQuantity: updateLocalQuantity } = useLocalCart();

  // Sync cart open state with context
  useEffect(() => {
    setIsCartOpen(isOpen);
  }, [isOpen, setIsCartOpen]);

  // Determine which cart to use
  const useLocalCartData = !activeOrder || error;
  const displayCart = useLocalCartData ? localCart : {
    items: activeOrder?.lines?.map(line => ({
      id: line.id,
      productId: line.productVariant?.product?.id || '',
      name: line.productVariant?.product?.name || 'Product',
      price: line.linePriceWithTax ? line.linePriceWithTax / line.quantity / 100 : 0,
      quantity: line.quantity,
      image: line.productVariant?.product?.featuredAsset?.preview || '/placeholder.svg',
      variantId: line.productVariant?.id
    })) || [],
    totalItems: totalItems || 0,
    totalPrice: totalPrice || 0,
  };
  
  // Debug logging for cart (simplified)
  console.log('ShoppingCart:', { 
    totalItems: displayCart.totalItems,
    itemsCount: displayCart.items.length,
    isOpen,
    useLocalCartData
  });
  
  // Force refresh when local cart changes
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [localCart.items.length, localCart.totalItems, localCart.items]);

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleRemoveItem = async (itemId: string, productName: string) => {
    if (useLocalCartData) {
      removeFromLocalCart(itemId);
      console.log(`${productName} removed from local cart`);
    } else {
      try {
        await removeFromCartMutation.mutateAsync(itemId);
        console.log(`${productName} removed from Vendure cart`);
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number, productName: string) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(itemId, productName);
      return;
    }
    
    if (useLocalCartData) {
      updateLocalQuantity(itemId, newQuantity);
      console.log(`${productName} quantity updated to ${newQuantity} in local cart`);
    } else {
      try {
        await updateQuantityMutation.mutateAsync({ orderLineId: itemId, quantity: newQuantity });
        console.log(`${productName} quantity updated to ${newQuantity} in Vendure cart`);
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    }
  };

  const formatPrice = (price: number) => {
    // For local cart, prices are already in dollars, for Vendure they're in cents
    const priceInDollars = useLocalCartData ? price : price / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD',
    }).format(priceInDollars);
  };

  return (
    <div key={refreshKey}>
      <Button 
        variant="outline" 
        size="icon" 
        className="relative"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ShoppingCartIcon className="h-5 w-5" />
        {displayCart.totalItems > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {displayCart.totalItems}
          </Badge>
        )}
      </Button>
      
      {/* Cart sidebar */}
      {isOpen && (
        <div 
          className="fixed top-0 right-0 z-[9999] h-full w-full max-w-md bg-gradient-to-b from-background/95 to-muted/95 border-l shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm transform translate-x-0 transition-transform duration-300 ease-in-out"
          style={{
            animation: 'slideInRight 0.3s ease-out',
            height: '100vh',
            paddingTop: '60px', // Reduced padding for small screens
            minHeight: '400px' // Ensure minimum height
          }}
        >
            <div className="p-3 sm:p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1 sm:p-2 bg-primary/10 rounded-full">
                    <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-lg font-bold text-foreground">Cart</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">{displayCart.totalItems} item{displayCart.totalItems !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col" style={{ height: 'calc(100vh - 60px)', minHeight: '340px' }}>
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-2 sm:space-y-4" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                
                {isLoading && !useLocalCartData ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : displayCart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="p-6 bg-muted/30 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <ShoppingCartIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayCart.items.map((item) => (
                      <div key={item.id} className="group relative flex items-start space-x-2 sm:space-x-4 p-2 sm:p-4 border border-border/50 rounded-xl bg-gradient-to-r from-card to-card/50 hover:from-card/80 hover:to-card/60 transition-all duration-200 hover:shadow-md hover:border-primary/20">
                        <div className="relative">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.name || 'Product'}
                            className="h-10 w-10 sm:h-14 sm:w-14 object-cover rounded-lg flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                            {item.name || 'Product'}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatPrice(item.price)} each
                          </p>
                          <p className="text-sm font-bold text-primary mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-3">
                          <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive transition-colors"
                              onClick={() => handleUpdateQuantity(
                                item.id, 
                                item.quantity - 1, 
                                item.name || 'Product'
                              )}
                              disabled={removeFromCartMutation.isPending || updateQuantityMutation.isPending}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-8 text-center text-sm font-bold text-foreground">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:bg-primary/10 hover:text-primary transition-colors"
                              onClick={() => handleUpdateQuantity(
                                item.id, 
                                item.quantity + 1, 
                                item.name || 'Product'
                              )}
                              disabled={removeFromCartMutation.isPending || updateQuantityMutation.isPending}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 opacity-0 group-hover:opacity-100"
                            onClick={() => handleRemoveItem(item.id, item.name || 'Product')}
                            disabled={removeFromCartMutation.isPending || updateQuantityMutation.isPending}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {displayCart.items.length > 0 && (
                <div className="border-t border-border/50 p-2 sm:p-6 space-y-2 sm:space-y-4 bg-gradient-to-t from-muted/30 to-transparent flex-shrink-0 mt-auto">
                  <div className="flex justify-between items-center p-2 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl border border-primary/10">
                    <div>
                      <span className="text-xs text-muted-foreground">Total ({displayCart.totalItems} items)</span>
                      <p className="text-sm sm:text-2xl font-bold text-primary">
                        {formatPrice(displayCart.totalPrice || 0)}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                      <ShoppingCartIcon className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full h-12 sm:h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base rounded-lg sm:rounded-xl border border-primary/20" 
                    size="lg"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/checkout');
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;


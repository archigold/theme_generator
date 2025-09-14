import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
// ❌ DON'T TOUCH - Critical hook imports
import { useProducts, useAddToCart } from "@/hooks/use-vendure";
import { useLocalCart } from "@/hooks/use-local-cart";
import { useToast } from "@/hooks/use-toast";
import { Timer, Zap, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Deals = () => {
  const { toast } = useToast();
  

  // ❌ DON'T TOUCH - Critical hook calls
  // Fetch products from Vendure (we'll treat all products as "deals" for now)
  const { data: productsData, isLoading, error } = useProducts({ take: 12 });
  const addToCartMutation = useAddToCart();
  const { addToCart: addToLocalCart } = useLocalCart();
  
  const handleAddToCart = async (productId: string, productName: string, variantId?: string) => {
    console.log('Deals: Add to cart clicked:', { productId, productName, variantId });
    
    // Always use local cart for now since Vendure API is not accessible
    console.log('Deals: Using local cart (Vendure API not accessible)');
    
    // Try to find the product in Vendure data
    if (productsData?.items) {
      const product = productsData.items.find(p => p.id === productId);
      if (product) {
        const defaultVariant = product.variants[0];
        const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
        console.log('Deals: Adding Vendure product to local cart:', { productId, productName, price });
        addToLocalCart(productId, productName, price, product.featuredAsset?.preview || '/placeholder.svg', variantId);
        toast({
          title: "Added to cart!",
          description: `${productName} has been added to your cart.`,
        });
        return;
      }
    }
    
    toast({
      title: "Error",
      description: "Product not found",
    });
  };

  const calculateSavings = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-yellow-400" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full text-white">
                Limited Time Offers
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Special Deals
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't miss out on these incredible savings. Limited quantities, limited time!
            </p>
          </div>
        </section>

        {/* Deal Stats */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Percent className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground mb-1">Up to 50%</h3>
                  <p className="text-muted-foreground">Maximum Savings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Timer className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground mb-1">{productsData?.items?.length || 0}</h3>
                  <p className="text-muted-foreground">Products on Sale</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-foreground mb-1">24h</h3>
                  <p className="text-muted-foreground">Time Remaining</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Deals Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Today's Best Deals
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Grab these amazing discounts before they're gone
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">Loading deals...</p>
              </div>
            ) : error || !productsData?.items || productsData.items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  No deals available at the moment.
                </p>
                <p className="text-muted-foreground">
                  Check back soon for amazing offers!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData.items.map((vendureProduct: any) => {
                  const defaultVariant = vendureProduct.variants?.[0];
                  const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
                  const originalPrice = price * 1.2; // Simulate 20% discount
                  
                  return (
                    <div key={vendureProduct.id} className="relative">
                      <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{calculateSavings(originalPrice, price)}%
                      </div>
                      <ProductCard
                        id={vendureProduct.id}
                        slug={vendureProduct.slug}
                        name={vendureProduct.name}
                        price={price}
                        originalPrice={originalPrice}
                        rating={4.5}
                        reviews={128}
                        image={vendureProduct.featuredAsset?.preview || '/placeholder.svg'}
                        badge="Sale"
                        onAddToCart={(id: string, name: string) => handleAddToCart(id, name, defaultVariant?.id)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
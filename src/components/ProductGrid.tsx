import ProductCard from "./ProductCard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProducts, useAddToCart } from "@/hooks/use-vendure";
import { useLocalCart } from "@/hooks/use-local-cart";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGrid = () => {
  const { toast } = useToast();
  // Use Vendure hooks
  const { data: productsData, isLoading, error } = useProducts({ take: 6 });
  const addToCartMutation = useAddToCart();
  // Local cart as fallback
  const { addToCart: addToLocalCart } = useLocalCart();

  // Debug logging
  console.log('ProductGrid Debug:', { productsData, isLoading, error });
  
  // Log product variants for debugging
  if (productsData?.items) {
    console.log('Found products:', productsData.items.length);
    productsData.items.forEach((product: any) => {
      console.log(`Product: ${product.name}`, {
        id: product.id,
        variants: product.variants?.map((v: any) => ({
          id: v.id,
          name: v.name,
          price: v.priceWithTax
        }))
      });
    });
  } else if (error) {
    console.error('Failed to fetch products:', error);
  }

  const handleAddToCart = async (productId: string, productName: string, variantId?: string) => {
    console.log('Add to cart clicked:', { productId, productName, variantId });
    
    // Only use Vendure products
    if (productsData?.items) {
      const product = productsData.items.find(p => p.id === productId);
      if (product) {
        const defaultVariant = product.variants[0];
        const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
        console.log('Adding Vendure product to local cart:', { productId, productName, price, image: product.featuredAsset?.preview });
        addToLocalCart(productId, productName, price, product.featuredAsset?.preview || '/placeholder.svg', variantId);
        toast({
          title: "Added to cart!",
          description: `${productName} has been added to your cart.`,
        });
        // Force a small delay to ensure state update
        setTimeout(() => {
          console.log('Cart update completed');
        }, 100);
        return;
      }
    }
    
    console.error('Product not found for ID:', productId);
    toast({
      title: "Error",
      description: "Product not found",
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of the latest and greatest gadgets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : error || !productsData?.items ? (
            // Show error message when Vendure API is not available
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-foreground mb-2">Unable to load products</h3>
              <p className="text-muted-foreground mb-4">
                We're having trouble connecting to our product catalog. Please try again later.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          ) : (
            productsData.items.map((vendureProduct) => {
              const defaultVariant = vendureProduct.variants[0];
              const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
              
              return (
                <ProductCard
                  key={vendureProduct.id}
                  id={vendureProduct.id}
                  slug={vendureProduct.slug}
                  name={vendureProduct.name}
                  price={price}
                  originalPrice={undefined} // You can add original price logic here
                  rating={4.5} // Default rating since Vendure doesn't have built-in ratings
                  reviews={0} // Default reviews count
                  image={vendureProduct.featuredAsset?.preview || '/placeholder.svg'}
                  badge={undefined} // You can add badge logic here
                  onAddToCart={(id: string, name: string) => handleAddToCart(id, name, defaultVariant?.id)}
                />
              );
            })
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
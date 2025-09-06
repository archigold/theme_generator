import ProductCard from "./ProductCard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<number[]>([]);

  const featuredProducts = products.slice(0, 6);

  const handleAddToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    const product = featuredProducts.find(p => p.id === productId);
    
    toast({
      title: "Added to cart!",
      description: `${product?.name} has been added to your cart.`,
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
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
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
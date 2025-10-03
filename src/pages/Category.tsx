import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
// ❌ DON'T TOUCH - Critical hook imports
import { useProducts, useAddToCart } from "@/hooks/use-vendure";
import { useLocalCart } from "@/hooks/use-local-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List } from "lucide-react";

const Category = () => {
  const { category } = useParams();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ❌ DON'T TOUCH - Critical hook calls
  // Fetch products from Vendure (for now, we'll get all products and filter by category name)
  const { data: productsData, isLoading, error } = useProducts({ take: 50 });
  const addToCartMutation = useAddToCart();
  const { addToCart: addToLocalCart } = useLocalCart();

  // Map category names to display names
  const categoryMap: { [key: string]: { name: string; description: string } } = {
    'smartphones': { name: 'Smartphones', description: 'Latest mobile devices and accessories' },
    'laptops': { name: 'Laptops', description: 'High-performance laptops and notebooks' },
    'audio': { name: 'Audio & Headphones', description: 'Premium audio equipment and headphones' },
    'wearables': { name: 'Wearables', description: 'Smartwatches and fitness trackers' },
    'tablets': { name: 'Tablets', description: 'Tablets and e-readers' },
    'accessories': { name: 'Accessories', description: 'Tech accessories and peripherals' }
  };

  const categoryInfo = categoryMap[category || ''];
  
  
  // Filter products by category (this is a simple implementation - in a real app you'd use Vendure collections)
  const products = productsData?.items?.filter((product: any) => {
    const productName = product.name.toLowerCase();
    const categoryName = category?.toLowerCase() || '';
    
    // Simple keyword matching - in a real app you'd use Vendure's collection system
    switch (categoryName) {
      case 'smartphones':
        return productName.includes('phone') || productName.includes('mobile');
      case 'laptops':
        return productName.includes('laptop') || productName.includes('notebook');
      case 'audio':
        return productName.includes('headphone') || productName.includes('speaker') || productName.includes('audio');
      case 'wearables':
        return productName.includes('watch') || productName.includes('fitness') || productName.includes('tracker');
      case 'tablets':
        return productName.includes('tablet') || productName.includes('ipad');
      case 'accessories':
        return productName.includes('case') || productName.includes('charger') || productName.includes('cable');
      default:
        return true;
    }
  }) || [];

  const sortedProducts = [...products].sort((a, b) => {
    const aPrice = a.variants?.[0]?.priceWithTax || 0;
    const bPrice = b.variants?.[0]?.priceWithTax || 0;
    
    switch (sortBy) {
      case "price-low":
        return aPrice - bPrice;
      case "price-high":
        return bPrice - aPrice;
      case "rating":
        return 0; // Vendure doesn't have ratings, so no sorting
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = async (productId: string, productName: string, variantId?: string) => {
    console.log('Category: Add to cart clicked:', { productId, productName, variantId });
    
    // Always use local cart for now since Vendure API is not accessible
    console.log('Category: Using local cart (Vendure API not accessible)');
    
    // Try to find the product in Vendure data
    if (productsData?.items) {
      const product = productsData.items.find(p => p.id === productId);
      if (product) {
        const defaultVariant = product.variants[0];
        const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
        console.log('Category: Adding Vendure product to local cart:', { productId, productName, price });
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

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {categoryInfo.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {products.length} products found
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              Failed to load products.
            </p>
            <p className="text-muted-foreground">
              Please try again later.
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {sortedProducts.map((vendureProduct: any) => {
              const defaultVariant = vendureProduct.variants?.[0];
              const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
              
              return (
                <ProductCard
                  key={vendureProduct.id}
                  id={vendureProduct.id}
                  slug={vendureProduct.slug}
                  name={vendureProduct.name}
                  price={price}
                  originalPrice={undefined}
                  rating={4.5}
                  reviews={128}
                  image={vendureProduct.featuredAsset?.preview || '/placeholder.svg'}
                  badge={undefined}
                  onAddToCart={(id: string, name: string) => handleAddToCart(id, name, defaultVariant?.id)}
                />
              );
            })}
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No products found in this category.
            </p>
            <Button onClick={() => window.history.back()}>
              Browse Other Categories
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
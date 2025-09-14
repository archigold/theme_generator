import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Share2, Truck, Shield, RotateCcw, Copy, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Temporarily disable Separator to fix loading issue
// import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
// ❌ DON'T TOUCH - Critical hook imports
import { useProduct, useProductById, useAddToCart } from "@/hooks/use-vendure";
import { useLocalCart } from "@/hooks/use-local-cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // ❌ DON'T TOUCH - Critical hook calls and data logic
  // Use Vendure hooks to fetch product data - try both slug and ID
  const { data: vendureProductBySlug, isLoading: isLoadingBySlug, error: errorBySlug } = useProduct(id || '');
  const { data: vendureProductById, isLoading: isLoadingById, error: errorById } = useProductById(id || '');
  const addToCartMutation = useAddToCart();
  
  // Local cart as fallback
  const { addToCart: addToLocalCart } = useLocalCart();
  
  // Determine which product data to use
  const vendureProduct = vendureProductBySlug || vendureProductById;
  const isLoading = isLoadingBySlug || isLoadingById;
  const error = errorBySlug && errorById ? errorBySlug : null;




  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: vendureProduct?.name || 'Check out this product',
      text: vendureProduct?.description || 'Amazing product you should see',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link has been copied to your clipboard.",
        });
      } catch (clipboardError) {
        toast({
          title: "Share failed",
          description: "Unable to share or copy link.",
          variant: "destructive",
        });
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !vendureProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">
            We couldn't find the product you're looking for. It may have been removed or the link is incorrect.
          </p>
          <Button onClick={() => navigate("/products")}>
            Browse All Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Transform Vendure product to match expected format
  const defaultVariant = vendureProduct.variants?.[0];
  const product = {
    id: vendureProduct.id,
    name: vendureProduct.name,
    description: vendureProduct.description || 'No description available',
    price: defaultVariant ? defaultVariant.priceWithTax / 100 : 0,
    originalPrice: undefined,
    image: vendureProduct.featuredAsset?.preview || '/placeholder.svg',
    rating: 4.5, // Default rating since Vendure doesn't have this
    reviews: 128, // Default reviews
    badge: undefined,
    specifications: {
      'Brand': 'TechTrek',
      'Model': vendureProduct.name,
      'SKU': defaultVariant?.sku || 'N/A',
      'Availability': 'In Stock'
    },
    features: [
      'High-quality materials',
      'Advanced technology',
      'User-friendly design',
      'Durable construction'
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCart = async () => {
    if (vendureProduct) {
      const defaultVariant = vendureProduct.variants[0];
      const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
      const variantId = defaultVariant?.id;
      
      console.log('Adding Vendure product to local cart:', { 
        productId: vendureProduct.id, 
        productName: vendureProduct.name, 
        price, 
        image: vendureProduct.featuredAsset?.preview 
      });
      
      addToLocalCart(
        vendureProduct.id, 
        vendureProduct.name, 
        price, 
        vendureProduct.featuredAsset?.preview || '/placeholder.svg', 
        variantId
      );
      
      toast({
        title: "Added to cart!",
        description: `${vendureProduct.name} has been added to your cart.`,
      });
      
      // Force a small delay to ensure state update
      setTimeout(() => {
        console.log('Cart update completed');
      }, 100);
    } else {
      console.log('No product available');
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = async () => {
    if (vendureProduct) {
      const defaultVariant = vendureProduct.variants[0];
      const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
      const variantId = defaultVariant?.id;
      
      console.log('Adding to local cart for Buy Now:', { 
        productId: vendureProduct.id, 
        productName: vendureProduct.name, 
        price, 
        image: vendureProduct.featuredAsset?.preview 
      });
      
      // First: Add to cart (same as Add to Cart button)
      addToLocalCart(
        vendureProduct.id, 
        vendureProduct.name, 
        price, 
        vendureProduct.featuredAsset?.preview || '/placeholder.svg', 
        variantId
      );
      
      // Show success message
      toast({
        title: "Added to cart!",
        description: `${vendureProduct.name} has been added to your cart.`,
      });
      
      // Then: Navigate to checkout after a brief delay to ensure state update
      setTimeout(() => {
        navigate('/checkout');
      }, 500); // Small delay to ensure cart state is updated
    } else {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gradient-card shadow-card">
              {product.badge && (
                <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-base sm:text-lg font-medium">{product.rating}</span>
                <span className="text-sm sm:text-base text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl sm:text-2xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={handleBuyNow}
                  size="lg"
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
                
                <Button 
                  onClick={handleAddToCart}
                  size="lg"
                  variant="outline"
                  className="w-full h-12"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share this product</span>
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>2 year warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 gap-1 sm:gap-0">
                      <span className="font-medium text-muted-foreground text-sm sm:text-base">{key}:</span>
                      <span className="text-foreground text-sm sm:text-base">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;

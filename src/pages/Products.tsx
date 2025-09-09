import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SearchBarWithSuggestions from "@/components/SearchBarWithSuggestions";
import { useLocalCart } from "@/hooks/use-local-cart";
import { useProducts, useCollections, useSearchProducts, useAddToCart } from "@/hooks/use-vendure";
import { convertVendureProduct, convertVendureCollection } from "@/lib/vendure-api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid, List, Filter } from "lucide-react";

// Helper function to get sort options for Vendure
function getSortOptions(sortBy: string) {
  switch (sortBy) {
    case "price-low":
      return { price: 'ASC' as const };
    case "price-high":
      return { price: 'DESC' as const };
    case "name":
      return { name: 'ASC' as const };
    default:
      return { createdAt: 'DESC' as const };
  }
}

const Products = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get("q") || "";


  // Local cart
  const { addToCart: addToLocalCart } = useLocalCart();
  
  // Vendure hooks
  const { data: collectionsData } = useCollections();
  const { data: productsData, isLoading: productsLoading } = useProducts({ 
    take: 100
  });
  const { data: searchData, isLoading: searchLoading } = useSearchProducts(
    searchQuery, 
    { 
      take: 100,
      collectionSlug: selectedCollections[0] // Use first selected collection
    }
  );
  const addToCartMutation = useAddToCart();

  // Determine which data to use
  const isSearchMode = searchQuery.length > 0;
  const isLoading = isSearchMode ? searchLoading : productsLoading;
  const rawProducts = isSearchMode ? searchData?.items : productsData?.items;

  // Debug logging
  console.log('Products page debug:', {
    collectionsData: collectionsData?.length || 0,
    productsData: productsData?.items?.length || 0,
    selectedCollections,
    isSearchMode,
    searchQuery
  });

  // Process products with filters
  const processedProducts = rawProducts ? rawProducts.map(item => {
    if (isSearchMode) {
      // Convert search result to product format
      return {
        id: item.productId,
        name: item.productName,
        slug: item.slug,
        price: (typeof item.priceWithTax === 'object' ? item.priceWithTax.min || 0 : item.priceWithTax) / 100,
        rating: 4.5,
        reviews: 0,
        image: item.productAsset?.preview || item.productVariantAsset?.preview || '/placeholder.svg',
        category: 'uncategorized',
        description: '',
        specifications: {},
        features: [],
        inStock: true,
        variants: [{
          id: item.productVariantId,
          name: item.productVariantName,
          price: (typeof item.priceWithTax === 'object' ? item.priceWithTax.min || 0 : item.priceWithTax) / 100,
          sku: item.sku,
          stockLevel: 'IN_STOCK',
          options: [],
        }],
        collections: [],
      };
    } else {
      // Convert Vendure product to our format
      const defaultVariant = item.variants[0];
      const price = defaultVariant ? defaultVariant.priceWithTax / 100 : 0;
      
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: price,
        originalPrice: undefined,
        rating: 4.5,
        reviews: 0,
        image: item.featuredAsset?.preview || '/placeholder.svg',
        category: item.collections[0]?.slug || 'uncategorized',
        description: item.description,
        specifications: {},
        features: [],
        inStock: defaultVariant ? defaultVariant.stockLevel !== 'OUT_OF_STOCK' : false,
        variants: item.variants.map(v => ({
          id: v.id,
          name: v.name,
          price: v.priceWithTax / 100,
          sku: v.sku,
          stockLevel: v.stockLevel,
          options: v.options,
        })),
        collections: item.collections || [],
      };
    }
  }).filter(product => {
    // Apply collection filter
    if (selectedCollections.length > 0) {
      const productCollectionSlugs = product.collections.map(c => c.slug);
      const hasMatchingCollection = selectedCollections.some(selectedSlug => 
        productCollectionSlugs.includes(selectedSlug)
      );
      if (!hasMatchingCollection) {
        return false;
      }
    }

    // Apply price filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-100":
          return product.price < 100;
        case "100-500":
          return product.price >= 100 && product.price <= 500;
        case "500-1000":
          return product.price >= 500 && product.price <= 1000;
        case "over-1000":
          return product.price > 1000;
        default:
          return true;
      }
    }
    return true;
  }).sort((a, b) => {
    // Apply client-side sorting
    console.log('Sorting by:', sortBy);
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0; // No sorting for "featured"
    }
  }) : [];
  
  // Debug: Log first few products to verify sorting
  if (processedProducts.length > 0) {
    console.log('First 3 products after sorting:', processedProducts.slice(0, 3).map(p => ({
      name: p.name,
      price: p.price,
      rating: p.rating
    })));
  }

  const handleCollectionChange = (collectionSlug: string, checked: boolean) => {
    console.log('Collection filter changed:', { collectionSlug, checked });
    if (checked) {
      setSelectedCollections(prev => {
        const newSelection = [...prev, collectionSlug];
        console.log('Selected collections:', newSelection);
        return newSelection;
      });
    } else {
      setSelectedCollections(prev => {
        const newSelection = prev.filter(slug => slug !== collectionSlug);
        console.log('Selected collections:', newSelection);
        return newSelection;
      });
    }
  };

  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  const handleAddToCart = async (productId: string, productName: string, variantId?: string) => {
    try {
      const product = processedProducts.find(p => p.id === productId);
      const targetVariantId = variantId || (product?.variants?.[0]?.id) || productId;
      
      await addToCartMutation.mutateAsync({ 
        productVariantId: targetVariantId, 
        quantity: 1 
      });
      
      toast({
        title: "Added to cart!",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      // Fallback to local cart if Vendure fails
      const product = processedProducts.find(p => p.id === productId);
      if (product) {
        addToLocalCart(productId, productName, product.price, product.image, variantId);
    toast({
      title: "Added to cart!",
          description: `${productName} has been added to your cart.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const clearFilters = () => {
    setSelectedCollections([]);
    setPriceRange("all");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {isLoading ? "Loading..." : `${processedProducts.length} products found`}
          </p>
          
          {/* Search Bar */}
          <SearchBarWithSuggestions onSearch={handleSearch} className="max-w-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Categories Filter - Temporarily disabled */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {collectionsData?.map((collection) => (
                    <div key={collection.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={collection.slug}
                        checked={selectedCollections.includes(collection.slug)}
                        onCheckedChange={(checked) => 
                          handleCollectionChange(collection.slug, checked as boolean)
                        }
                      />
                      <label htmlFor={collection.slug} className="text-sm font-medium">
                        {collection.name}
                      </label>
                    </div>
                  )) || (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Price Filter */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-100">Under $100</SelectItem>
                      <SelectItem value="100-500">$100 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1000</SelectItem>
                      <SelectItem value="over-1000">Over $1000</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
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
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : processedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {processedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    reviews={product.reviews}
                    image={product.image}
                    badge={product.badge}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
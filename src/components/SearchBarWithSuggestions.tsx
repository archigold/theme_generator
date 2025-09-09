import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts, useSearchProducts } from "@/hooks/use-vendure";
import { convertVendureProduct } from "@/lib/vendure-api";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBarWithSuggestions = ({ onSearch, placeholder = "Search products...", className }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get products for suggestions
  const { data: productsData } = useProducts({ take: 50 });
  const { data: searchData } = useSearchProducts(query, { take: 10 });

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get suggestions based on query
  const getSuggestions = () => {
    if (!query.trim() || query.length < 2) return [];

    // Only use products that are actually loaded and available
    if (productsData?.items && productsData.items.length > 0) {
      console.log('Search: Available products count:', productsData.items.length);
      console.log('Search: Query:', query);
      
      const filteredProducts = productsData.items
        .filter(product => {
          // Filter by name match
          const nameMatch = product.name.toLowerCase().includes(query.toLowerCase());
          // Ensure product has valid data
          const hasValidData = product.name && product.id && product.variants && product.variants.length > 0;
          // Ensure product has a valid variant with price
          const hasValidVariant = product.variants.some(variant => 
            variant.priceWithTax > 0 && variant.stockLevel !== 'OUT_OF_STOCK'
          );
          // Ensure product is enabled/published
          const isAvailable = product.variants.some(variant => variant.stockLevel === 'IN_STOCK' || variant.stockLevel === 'LOW_STOCK');
          
          const isValid = nameMatch && hasValidData && hasValidVariant && isAvailable;
          
          if (nameMatch) {
            console.log(`Product "${product.name}":`, {
              nameMatch,
              hasValidData,
              hasValidVariant,
              isAvailable,
              isValid,
              variants: product.variants?.map(v => ({
                id: v.id,
                stockLevel: v.stockLevel,
                price: v.priceWithTax
              }))
            });
          }
          
          return isValid;
        })
        .slice(0, 8);
      
      console.log('Search: Filtered products count:', filteredProducts.length);
      
      return filteredProducts.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.featuredAsset?.preview || '/placeholder.svg',
        price: product.variants[0]?.priceWithTax || 0
      }));
    }

    // Fallback: if Vendure products aren't loaded, don't show any suggestions
    // This ensures we only show products that are actually available on the website
    return [];
  };

  const suggestions = getSuggestions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length >= 2);
    setSelectedIndex(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.name);
    setIsOpen(false);
    navigate(`/product/${suggestion.slug || suggestion.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSearch) {
      onSearch("");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder={placeholder}
            className="pl-10 pr-10 bg-background"
            autoComplete="off"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-muted z-10"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button type="submit" size="sm" className="ml-2 bg-gradient-primary hover:opacity-90">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2 px-2">
              {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-md text-left hover:bg-muted transition-colors",
                  selectedIndex === index && "bg-muted"
                )}
              >
                <img
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {suggestion.name}
                  </div>
                  <div className="text-xs text-primary font-semibold">
                    {formatPrice(suggestion.price)}
                  </div>
                </div>
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
          
          {query.length >= 2 && (
            <div className="border-t border-border p-2">
              <button
                onClick={handleSearch}
                className="w-full flex items-center gap-2 p-2 rounded-md text-left hover:bg-muted transition-colors text-sm text-muted-foreground"
              >
                <Search className="h-4 w-4" />
                Search for "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;

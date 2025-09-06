import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartItems, setCartItems] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">G</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">GadgetStore</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">Products</Link>
            <Link to="/deals" className="text-foreground hover:text-primary transition-colors">Deals</Link>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">Categories</button>
              <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-lg p-4 space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48">
                <Link to="/category/smartphones" className="block text-foreground hover:text-primary transition-colors">Smartphones</Link>
                <Link to="/category/laptops" className="block text-foreground hover:text-primary transition-colors">Laptops</Link>
                <Link to="/category/audio" className="block text-foreground hover:text-primary transition-colors">Audio & Headphones</Link>
                <Link to="/category/wearables" className="block text-foreground hover:text-primary transition-colors">Wearables</Link>
                <Link to="/category/tablets" className="block text-foreground hover:text-primary transition-colors">Tablets</Link>
                <Link to="/category/accessories" className="block text-foreground hover:text-primary transition-colors">Accessories</Link>
              </div>
            </div>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <SearchBar className="w-64" />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBarWithSuggestions from "@/components/SearchBarWithSuggestions";
import MobileSearchModal from "@/components/MobileSearchModal";
import ShoppingCart from "@/components/ShoppingCart";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/30 backdrop-blur-glass border-b border-border/20 shadow-glass">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-neon group-hover:shadow-glow transition-all duration-300">
              <span className="text-primary-foreground font-bold">G</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">GadgetStore</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">Products</Link>
            <Link to="/deals" className="text-foreground hover:text-primary transition-colors">Deals</Link>
            <Link to="/theme-studio" className="text-foreground hover:text-primary transition-colors">Theme Studio</Link>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors">Categories</button>
              <div className="absolute top-full left-0 bg-card/80 backdrop-blur-glass border border-border/20 rounded-lg shadow-elegant p-4 space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-48">
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
              <SearchBarWithSuggestions className="w-64" />
            </div>
            
            <MobileSearchModal />
            <ShoppingCart />

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
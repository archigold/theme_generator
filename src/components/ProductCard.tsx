import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  variantId?: string;
  onAddToCart: (id: string, name: string, variantId?: string) => void;
}

const ProductCard = ({ 
  id, 
  slug,
  name, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  badge,
  variantId,
  onAddToCart 
}: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-neon transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border border-border/20">
      <div className="relative overflow-hidden">
        {badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}
        <Link to={`/product/${slug || id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/product/${slug || id}`}>
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-sm text-muted-foreground ml-1">
            ({reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToCart(id, name, variantId)}
          variant="neon"
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
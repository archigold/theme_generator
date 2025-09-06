import ProductCard from "./ProductCard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import smartphoneImg from "@/assets/smartphone.jpg";
import laptopImg from "@/assets/laptop.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";

const ProductGrid = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Premium Smartphone Pro Max",
      price: 999,
      originalPrice: 1199,
      rating: 4.8,
      reviews: 2847,
      image: smartphoneImg,
      badge: "Hot Deal"
    },
    {
      id: 2,
      name: "Gaming Laptop Ultra",
      price: 1599,
      originalPrice: 1899,
      rating: 4.9,
      reviews: 1293,
      image: laptopImg,
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Wireless Noise-Canceling Headphones",
      price: 299,
      originalPrice: 399,
      rating: 4.7,
      reviews: 3521,
      image: headphonesImg,
      badge: "Save 25%"
    },
    {
      id: 4,
      name: "Smart Fitness Watch Pro",
      price: 399,
      rating: 4.6,
      reviews: 1876,
      image: smartwatchImg,
    },
    {
      id: 5,
      name: "Premium Smartphone Standard",
      price: 699,
      originalPrice: 799,
      rating: 4.5,
      reviews: 892,
      image: smartphoneImg,
    },
    {
      id: 6,
      name: "Professional Gaming Headset",
      price: 179,
      originalPrice: 229,
      rating: 4.4,
      reviews: 1456,
      image: headphonesImg,
      badge: "Limited"
    }
  ];

  const handleAddToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    const product = products.find(p => p.id === productId);
    
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
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
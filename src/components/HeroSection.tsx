import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[500px] flex items-center">
      <div className="absolute inset-0 bg-black/20 z-10" />
      <img 
        src={heroBanner}
        alt="Latest gadgets collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              New Arrivals
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Latest Tech
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Gadgets
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-lg">
            Discover cutting-edge technology and innovative gadgets that transform your daily life. Premium quality, unbeatable prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              >
                Shop Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/deals">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8"
              >
                View Deals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-neon/10 z-15" />
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
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">Future Tech</span>
            <span className="block text-transparent bg-gradient-neon bg-clip-text drop-shadow-glow animate-pulse">
              Unleashed
            </span>
          </h1>
          
          <p className="text-xl text-white/95 mb-8 max-w-lg backdrop-blur-sm">
            Experience tomorrow's technology today. Revolutionary gadgets that redefine possibilities and elevate your digital lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button 
                variant="neon"
                size="lg" 
                className="font-semibold px-8"
              >
                Explore Future
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/deals">
              <Button 
                variant="glass" 
                size="lg"
                className="font-semibold px-8"
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
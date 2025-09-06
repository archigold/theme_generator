import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">G</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">GadgetStore</h3>
            </div>
            <p className="text-muted-foreground">
              Your trusted destination for the latest tech gadgets and electronics. 
              We offer premium quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</a></li>
              <li><a href="/deals" className="text-muted-foreground hover:text-primary transition-colors">Deals</a></li>
              <li><a href="/category/smartphones" className="text-muted-foreground hover:text-primary transition-colors">Smartphones</a></li>
              <li><a href="/category/laptops" className="text-muted-foreground hover:text-primary transition-colors">Laptops</a></li>
              <li><a href="/category/audio" className="text-muted-foreground hover:text-primary transition-colors">Audio</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Separator />

      {/* Features Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Secure Payment</p>
              <p className="text-xs text-muted-foreground">100% Protected</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30-day policy</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">24/7 Support</p>
              <p className="text-xs text-muted-foreground">Dedicated help</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Contact Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">support@gadgetstore.com</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">123 Tech Street, San Francisco, CA</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 GadgetStore. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">VISA</span>
              </div>
              <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">MC</span>
              </div>
              <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                <span className="text-xs font-bold text-blue-800">AMEX</span>
              </div>
              <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">PP</span>
              </div>
              <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                <CreditCard className="h-3 w-3 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
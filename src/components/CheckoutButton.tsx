import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutButtonProps {
  productId: string;
  productName: string;
  price: number;
}

const CheckoutButton = ({ productId, productName, price }: CheckoutButtonProps) => {
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      // This would integrate with Stripe - placeholder for now
      toast({
        title: "Checkout Coming Soon!",
        description: `${productName} will be added to cart. Stripe integration ready for setup.`,
      });
      
      // Future Stripe integration would go here:
      // const response = await supabase.functions.invoke('create-payment', {
      //   body: { productId, productName, price }
      // });
      // if (response.data?.url) {
      //   window.open(response.data.url, '_blank');
      // }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      className="w-full bg-gradient-primary hover:opacity-90 text-white"
      size="lg"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Buy Now - ${price}
    </Button>
  );
};

export default CheckoutButton;
import { useCartContext } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function CartAwareToaster() {
  const { toasts } = useToast();
  const { isCartOpen } = useCartContext();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport 
        className={cn(
          "fixed bottom-0 z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]",
          isCartOpen 
            ? "sm:right-[28rem] md:right-[30rem]" // Position to the left of cart when open (cart is max-w-md = 28rem)
            : "right-0" // Normal position when cart is closed
        )}
      />
    </ToastProvider>
  );
}

// Button component styles for the default theme
// These can be easily swapped out for different themes

export const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  
  variants: {
    default: "bg-gradient-primary text-primary-foreground hover:shadow-neon transition-all duration-300",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background/50 backdrop-blur-glass hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    neon: "bg-gradient-neon text-primary-foreground hover:shadow-glow transform hover:scale-105 transition-all duration-300",
    glass: "bg-gradient-glass backdrop-blur-glass border border-white/10 text-foreground hover:bg-white/10 shadow-glass",
  },
  
  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
  
  defaultVariants: {
    variant: "default",
    size: "default",
  },
};

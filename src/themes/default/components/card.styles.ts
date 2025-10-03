// Card component styles for the default theme

export const cardStyles = {
  base: "rounded-lg border bg-card text-card-foreground shadow-sm",
  header: "flex flex-col space-y-1.5 p-6",
  title: "text-2xl font-semibold leading-none tracking-tight",
  description: "text-sm text-muted-foreground",
  content: "p-6 pt-0",
  footer: "flex items-center p-6 pt-0",
  
  // Product card specific styles
  productCard: "group overflow-hidden bg-gradient-card shadow-card hover:shadow-neon transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border border-border/20",
  productImage: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer",
  productTitle: "font-semibold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer",
  productPrice: "text-2xl font-bold text-primary",
  productOriginalPrice: "text-lg text-muted-foreground line-through",
  productRating: "h-4 w-4",
  productRatingFilled: "fill-yellow-400 text-yellow-400",
  productRatingEmpty: "text-gray-300",
  productReviews: "text-sm text-muted-foreground ml-1",
  productBadge: "absolute top-3 left-3 z-10 bg-primary text-primary-foreground",
};

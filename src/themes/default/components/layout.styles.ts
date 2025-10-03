// Layout component styles for the default theme

export const layoutStyles = {
  // Header styles
  header: "sticky top-0 z-50 bg-background/30 backdrop-blur-glass border-b border-border/20 shadow-glass",
  headerContainer: "container mx-auto px-4 py-4",
  headerContent: "flex items-center justify-between",
  
  // Logo styles
  logo: "flex items-center gap-2 group",
  logoIcon: "w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-neon group-hover:shadow-glow transition-all duration-300",
  logoText: "text-xl font-bold bg-gradient-neon bg-clip-text text-transparent",
  
  // Navigation styles
  nav: "hidden md:flex items-center gap-8",
  navLink: "text-foreground hover:text-primary transition-colors",
  navDropdown: "relative group",
  navDropdownButton: "text-foreground hover:text-primary transition-colors",
  navDropdownMenu: "absolute top-full left-0 bg-card/80 backdrop-blur-glass border border-border/20 rounded-lg shadow-elegant p-4 space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-48",
  navDropdownLink: "block text-foreground hover:text-primary transition-colors",
  
  // Hero section styles
  hero: "relative overflow-hidden bg-gradient-hero min-h-[600px] flex items-center",
  heroOverlay: "absolute inset-0 bg-black/40 z-10",
  heroGradient: "absolute inset-0 bg-gradient-neon/10 z-15",
  heroImage: "absolute inset-0 w-full h-full object-cover",
  heroContent: "container mx-auto px-4 relative z-20",
  heroText: "max-w-2xl text-white",
  heroBadge: "flex items-center gap-2 mb-4",
  heroBadgeIcon: "h-5 w-5 text-yellow-400",
  heroBadgeText: "text-sm font-medium bg-white/20 px-3 py-1 rounded-full",
  heroTitle: "text-5xl md:text-7xl font-bold mb-6 leading-tight",
  heroTitleMain: "block text-white drop-shadow-2xl",
  heroTitleAccent: "block text-transparent bg-gradient-neon bg-clip-text drop-shadow-glow animate-pulse",
  heroDescription: "text-xl text-white/95 mb-8 max-w-lg backdrop-blur-sm",
  heroActions: "flex flex-col sm:flex-row gap-4",
  
  // Footer styles
  footer: "bg-card border-t border-border",
  footerMain: "container mx-auto px-4 py-12",
  footerGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  footerSection: "space-y-4",
  footerTitle: "text-lg font-semibold text-foreground",
  footerLink: "text-muted-foreground hover:text-primary transition-colors",
  footerDivider: "border-t border-border",
  footerFeatures: "container mx-auto px-4 py-6",
  footerFeaturesGrid: "grid grid-cols-2 md:grid-cols-4 gap-4",
  footerFeature: "flex items-center gap-3",
  footerFeatureIcon: "h-5 w-5 text-primary",
  footerFeatureTitle: "font-medium text-sm",
  footerFeatureDesc: "text-xs text-muted-foreground",
  footerContact: "container mx-auto px-4 py-6",
  footerContactGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left",
  footerContactItem: "flex items-center justify-center md:justify-start gap-2",
  footerContactIcon: "h-4 w-4 text-primary",
  footerContactText: "text-sm text-muted-foreground",
  footerBottom: "container mx-auto px-4 py-6",
  footerBottomContent: "flex flex-col md:flex-row justify-between items-center gap-4",
  footerCopyright: "text-sm text-muted-foreground",
  footerLinks: "flex gap-4 text-sm",
  footerPayment: "flex items-center gap-2",
  footerPaymentText: "text-sm text-muted-foreground",
  footerPaymentIcons: "flex gap-2",
  footerPaymentIcon: "w-10 h-6 bg-white rounded border flex items-center justify-center",
  
  // Container styles
  container: "container mx-auto px-4",
  containerPy: "container mx-auto px-4 py-8",
  containerPy16: "container mx-auto px-4 py-16",
  
  // Grid styles
  grid1: "grid grid-cols-1 gap-6",
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  grid4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  gridProducts: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
};

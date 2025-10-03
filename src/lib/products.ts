import smartphoneImg from "@/assets/smartphone.jpg";
import laptopImg from "@/assets/laptop.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import tabletImg from "@/assets/tablet.jpg";
import gamingMouseImg from "@/assets/gaming-mouse.jpg";
import speakerImg from "@/assets/speaker.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Smartphone Pro Max",
    price: 999,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 2847,
    image: smartphoneImg,
    badge: "Hot Deal",
    category: "smartphones",
    description: "Experience the future with our flagship smartphone featuring cutting-edge technology, premium materials, and unmatched performance.",
    specifications: {
      "Display": "6.7\" Super Retina XDR",
      "Processor": "A17 Pro Chip",
      "Storage": "256GB",
      "Camera": "48MP Triple System",
      "Battery": "4000mAh",
      "OS": "iOS 17"
    },
    features: [
      "Advanced Face ID",
      "Wireless Charging",
      "Water Resistant IP68",
      "5G Connectivity",
      "Professional Photography",
      "All-Day Battery Life"
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Gaming Laptop Ultra",
    price: 1599,
    originalPrice: 1899,
    rating: 4.9,
    reviews: 1293,
    image: laptopImg,
    badge: "Best Seller",
    category: "laptops",
    description: "Unleash your gaming potential with this powerful laptop designed for enthusiasts who demand the best performance.",
    specifications: {
      "Processor": "Intel Core i7-13700H",
      "Graphics": "NVIDIA RTX 4070",
      "RAM": "32GB DDR5",
      "Storage": "1TB NVMe SSD",
      "Display": "15.6\" 165Hz QHD",
      "Weight": "2.3kg"
    },
    features: [
      "RGB Backlit Keyboard",
      "Advanced Cooling System",
      "Thunderbolt 4 Ports",
      "Wi-Fi 6E",
      "Premium Audio",
      "VR Ready"
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 3521,
    image: headphonesImg,
    badge: "Save 25%",
    category: "audio",
    description: "Immerse yourself in crystal-clear audio with industry-leading noise cancellation technology.",
    specifications: {
      "Driver": "40mm Dynamic",
      "Frequency Response": "4Hz-40kHz",
      "Battery Life": "30 hours",
      "Charging": "USB-C Quick Charge",
      "Weight": "254g",
      "Connectivity": "Bluetooth 5.2"
    },
    features: [
      "Active Noise Cancellation",
      "Hi-Res Audio Certified",
      "Quick Charge Technology",
      "Multi-Device Pairing",
      "Touch Controls",
      "Foldable Design"
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Smart Fitness Watch Pro",
    price: 399,
    rating: 4.6,
    reviews: 1876,
    image: smartwatchImg,
    category: "wearables",
    description: "Track your fitness journey with advanced health monitoring and smart features in a premium design.",
    specifications: {
      "Display": "1.4\" AMOLED",
      "Battery": "7 days typical use",
      "Water Rating": "50m",
      "Sensors": "Heart Rate, GPS, SpO2",
      "Connectivity": "Bluetooth, Wi-Fi",
      "Compatibility": "iOS & Android"
    },
    features: [
      "Advanced Health Tracking",
      "Built-in GPS",
      "Sleep Monitoring",
      "Workout Detection",
      "Smart Notifications",
      "Always-On Display"
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Premium Tablet Pro",
    price: 799,
    originalPrice: 899,
    rating: 4.5,
    reviews: 1234,
    image: tabletImg,
    category: "tablets",
    description: "Professional tablet with stunning display and powerful performance for work and creativity.",
    specifications: {
      "Display": "12.9\" Liquid Retina",
      "Processor": "M2 Chip",
      "Storage": "128GB",
      "Camera": "12MP + 10MP",
      "Battery": "10 hours",
      "Weight": "682g"
    },
    features: [
      "Apple Pencil Support",
      "Magic Keyboard Compatible",
      "Pro Display Technology",
      "Center Stage Camera",
      "USB-C with Thunderbolt",
      "5G Cellular Option"
    ],
    inStock: true
  },
  {
    id: 6,
    name: "Professional Gaming Mouse",
    price: 129,
    originalPrice: 179,
    rating: 4.4,
    reviews: 2156,
    image: gamingMouseImg,
    badge: "Gaming",
    category: "accessories",
    description: "Precision gaming mouse with customizable RGB lighting and ultra-responsive sensors.",
    specifications: {
      "Sensor": "25,600 DPI",
      "Polling Rate": "1000Hz",
      "Buttons": "11 Programmable",
      "Weight": "85g",
      "Cable": "Braided USB-C",
      "Compatibility": "Windows, Mac, Linux"
    },
    features: [
      "Customizable RGB Lighting",
      "Ultra-Light Design",
      "Programmable Buttons",
      "On-The-Fly DPI",
      "Zero Lag Wireless",
      "Pro Gaming Sensor"
    ],
    inStock: true
  },
  {
    id: 7,
    name: "Bluetooth Premium Speaker",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviews: 987,
    image: speakerImg,
    category: "audio",
    description: "Portable speaker with rich, room-filling sound and premium build quality.",
    specifications: {
      "Output Power": "40W Stereo",
      "Battery": "12 hours playback",
      "Connectivity": "Bluetooth 5.0",
      "Water Rating": "IPX7",
      "Weight": "1.2kg",
      "Range": "30m"
    },
    features: [
      "360° Sound Technology",
      "Waterproof Design",
      "Voice Assistant Support",
      "Party Connect",
      "Fast Charging",
      "Premium Materials"
    ],
    inStock: true
  },
  {
    id: 8,
    name: "Premium Smartphone Standard",
    price: 699,
    originalPrice: 799,
    rating: 4.5,
    reviews: 892,
    image: smartphoneImg,
    category: "smartphones",
    description: "Reliable smartphone with essential features and excellent value for everyday use.",
    specifications: {
      "Display": "6.1\" OLED",
      "Processor": "A16 Bionic",
      "Storage": "128GB",
      "Camera": "12MP Dual System",
      "Battery": "3200mAh",
      "OS": "iOS 17"
    },
    features: [
      "Face ID Security",
      "Wireless Charging",
      "Water Resistant",
      "5G Ready",
      "Night Mode Camera",
      "MagSafe Compatible"
    ],
    inStock: true
  }
];

export const categories = [
  { id: "smartphones", name: "Smartphones", count: 2 },
  { id: "laptops", name: "Laptops", count: 1 },
  { id: "audio", name: "Audio & Headphones", count: 2 },
  { id: "wearables", name: "Wearables", count: 1 },
  { id: "tablets", name: "Tablets", count: 1 },
  { id: "accessories", name: "Accessories", count: 1 }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getDealsProducts = () => {
  return products.filter(product => product.originalPrice && product.originalPrice > product.price);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
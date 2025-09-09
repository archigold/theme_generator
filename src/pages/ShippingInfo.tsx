import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Clock, MapPin, Shield, Package, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ShippingInfo = () => {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      price: "$4.99",
      freeThreshold: 50,
      deliveryTime: "5-7 business days",
      description: "Reliable ground shipping for most items",
      icon: Truck,
      features: ["Tracking included", "Insurance up to $100", "Signature required for orders over $200"]
    },
    {
      name: "Express Shipping",
      price: "$12.99",
      freeThreshold: 100,
      deliveryTime: "2-3 business days",
      description: "Faster delivery for urgent orders",
      icon: Clock,
      features: ["Priority handling", "Tracking included", "Insurance up to $500", "Signature required"]
    },
    {
      name: "Overnight Shipping",
      price: "$24.99",
      freeThreshold: 200,
      deliveryTime: "1 business day",
      description: "Next-day delivery for time-sensitive orders",
      icon: Package,
      features: ["Express processing", "Real-time tracking", "Full insurance", "Signature required"]
    }
  ];

  const shippingZones = [
    {
      zone: "Continental US",
      description: "All 48 contiguous states",
      deliveryTime: "5-7 business days",
      freeShippingThreshold: 50
    },
    {
      zone: "Alaska & Hawaii",
      description: "Extended delivery areas",
      deliveryTime: "7-10 business days",
      freeShippingThreshold: 75
    },
    {
      zone: "International",
      description: "Global shipping available",
      deliveryTime: "10-21 business days",
      freeShippingThreshold: 150
    }
  ];

  const restrictions = [
    "Batteries and electronic devices with built-in batteries",
    "Liquids and gels over 3.4oz",
    "Hazardous materials and chemicals",
    "Items requiring special handling",
    "Fragile items over 50lbs"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Truck className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Shipping Information</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fast, reliable shipping options to get your tech gadgets delivered safely to your doorstep. 
            We offer multiple shipping methods to meet your needs and budget.
          </p>
        </div>

        {/* Free Shipping Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Free Shipping on Orders Over $50!</h2>
                <p className="text-muted-foreground">No minimum for Express and Overnight shipping</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Methods */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Shipping Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{method.name}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-lg font-bold">
                      {method.price}
                    </Badge>
                    <Badge variant="outline">
                      Free over ${method.freeThreshold}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{method.deliveryTime}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {method.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shipping Zones */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Shipping Zones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingZones.map((zone, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <CardTitle>{zone.zone}</CardTitle>
                  </div>
                  <CardDescription>{zone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Time:</span>
                      <span className="font-medium">{zone.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Free Shipping:</span>
                      <span className="font-medium">Over ${zone.freeShippingThreshold}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Processing Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Processing Times</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>In-stock items:</span>
                  <Badge variant="outline">1-2 business days</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Custom orders:</span>
                  <Badge variant="outline">3-5 business days</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Pre-orders:</span>
                  <Badge variant="outline">As specified</Badge>
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p><strong>Note:</strong> Processing time begins after payment confirmation and does not include weekends or holidays.</p>
              </div>
            </CardContent>
          </Card>

          {/* Tracking & Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Tracking & Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Real-time tracking</p>
                    <p className="text-sm text-muted-foreground">Track your package every step of the way</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-sm text-muted-foreground">Get updates on shipping status</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">24/7 customer support</p>
                    <p className="text-sm text-muted-foreground">We're here to help with any questions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping Restrictions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Shipping Restrictions</span>
            </CardTitle>
            <CardDescription>
              Some items have special shipping requirements or restrictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3">Restricted Items:</h4>
                <ul className="space-y-2">
                  {restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Special Handling:</h4>
                  <p className="text-sm text-muted-foreground">
                    Items requiring special handling may incur additional fees and extended processing times.
                    Contact us for specific requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">International Shipping:</h4>
                  <p className="text-sm text-muted-foreground">
                    International orders may be subject to customs duties and taxes. 
                    These are the responsibility of the recipient.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-primary" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How do I track my order?</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive a tracking number via email once your order ships. 
                  You can also track your order in your account dashboard.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I change my shipping address?</h4>
                <p className="text-sm text-muted-foreground">
                  Address changes can be made before your order ships. 
                  Contact our support team immediately if you need to make changes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What if my package is damaged?</h4>
                <p className="text-sm text-muted-foreground">
                  We take great care in packaging your items. If your package arrives damaged, 
                  contact us immediately and we'll arrange for a replacement or refund.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you ship internationally?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Still have questions about shipping?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer service team is here to help with any shipping questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="/faq" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  View FAQ
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingInfo;

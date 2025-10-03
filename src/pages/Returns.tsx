import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  Truck, 
  CreditCard, 
  AlertCircle,
  FileText,
  Mail,
  Phone,
  MessageCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Returns = () => {
  const [returnForm, setReturnForm] = useState({
    orderNumber: "",
    email: "",
    reason: "",
    description: ""
  });
  const { toast } = useToast();

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Return Request Submitted!",
      description: "We've received your return request and will email you a return label within 24 hours.",
    });
    setReturnForm({ orderNumber: "", email: "", reason: "", description: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setReturnForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <RotateCcw className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, 
            we're here to help with our hassle-free return and exchange policy.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">30 Days</h3>
              <p className="text-sm text-muted-foreground">Return Window</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Free Returns</h3>
              <p className="text-sm text-muted-foreground">On All Orders</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Full Refund</h3>
              <p className="text-sm text-muted-foreground">Original Payment</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Easy Process</h3>
              <p className="text-sm text-muted-foreground">Simple Steps</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="policy" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="policy">Return Policy</TabsTrigger>
            <TabsTrigger value="process">Return Process</TabsTrigger>
            <TabsTrigger value="exchanges">Exchanges</TabsTrigger>
            <TabsTrigger value="request">Start Return</TabsTrigger>
          </TabsList>

          {/* Return Policy Tab */}
          <TabsContent value="policy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Return Policy Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">General Return Policy</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We offer a 30-day return policy for most items. Items must be returned in their original condition, 
                    unused, and with all original packaging and accessories. Returns are processed within 3-5 business days 
                    after we receive your item.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Returnable Items
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Electronics in original packaging</li>
                      <li>• Accessories and cables (unused)</li>
                      <li>• Audio equipment (sealed/unused)</li>
                      <li>• Computer hardware (unopened)</li>
                      <li>• Gaming accessories</li>
                      <li>• Smart home devices (factory reset)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Non-Returnable Items
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Software and digital downloads</li>
                      <li>• Personalized or customized items</li>
                      <li>• Items damaged by misuse</li>
                      <li>• Hygiene-related products (earbuds, etc.)</li>
                      <li>• Gift cards and vouchers</li>
                      <li>• Items returned after 30 days</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    Important Notes
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Items must be in original condition with all accessories and documentation</li>
                    <li>• Return shipping is free when using our provided return labels</li>
                    <li>• Refunds are processed to the original payment method</li>
                    <li>• Custom or special order items may have different return policies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Item Received</h4>
                      <p className="text-sm text-muted-foreground">We receive and inspect your returned item</p>
                    </div>
                    <Badge variant="secondary">1-2 days</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Refund Processed</h4>
                      <p className="text-sm text-muted-foreground">Refund is approved and processed</p>
                    </div>
                    <Badge variant="secondary">2-3 days</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Refund Appears</h4>
                      <p className="text-sm text-muted-foreground">Refund appears in your account</p>
                    </div>
                    <Badge variant="secondary">3-7 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Return Process Tab */}
          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  How to Return Your Item
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">1</div>
                        <h3 className="text-lg font-semibold">Start Your Return</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Fill out our return form with your order number and reason for return. 
                        We'll email you a prepaid return label within 24 hours.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">2</div>
                        <h3 className="text-lg font-semibold">Package Your Item</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Carefully package your item in its original box with all accessories, 
                        manuals, and packaging materials. Use additional padding if needed.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">3</div>
                        <h3 className="text-lg font-semibold">Ship Your Return</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Attach the return label to your package and drop it off at any 
                        authorized shipping location. No need to pay for shipping!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Packaging Tips</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use original packaging when possible</li>
                        <li>• Include all accessories and cables</li>
                        <li>• Remove personal data from devices</li>
                        <li>• Take photos before shipping</li>
                        <li>• Keep tracking number for reference</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Need Help?</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                        Our customer service team is here to assist you with your return.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                          <Phone className="h-4 w-4" />
                          <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                          <Mail className="h-4 w-4" />
                          <span>returns@gadgetstore.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exchanges Tab */}
          <TabsContent value="exchanges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Product Exchanges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Exchange Policy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We offer exchanges for defective items, wrong items received, or different sizes/colors 
                    of the same product. Exchanges must be requested within 30 days of purchase.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Defective Items</h4>
                      <p className="text-sm text-muted-foreground">
                        Items that arrive damaged or don't work as expected can be exchanged for a new unit.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Package className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Wrong Item</h4>
                      <p className="text-sm text-muted-foreground">
                        If you received the wrong item, we'll send you the correct one at no extra cost.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 text-center">
                      <RotateCcw className="h-8 w-8 text-green-500 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Size/Color</h4>
                      <p className="text-sm text-muted-foreground">
                        Exchange for different size or color of the same product (subject to availability).
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Exchange Process</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">For Defective Items:</h5>
                      <ol className="text-sm text-muted-foreground space-y-1">
                        <li>1. Contact us with photos/description of the issue</li>
                        <li>2. We'll send a replacement immediately</li>
                        <li>3. Return the defective item using our prepaid label</li>
                        <li>4. No charge for expedited shipping</li>
                      </ol>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">For Other Exchanges:</h5>
                      <ol className="text-sm text-muted-foreground space-y-1">
                        <li>1. Submit exchange request with reason</li>
                        <li>2. Return original item in good condition</li>
                        <li>3. We'll ship replacement once received</li>
                        <li>4. Pay any price difference if applicable</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Start Return Tab */}
          <TabsContent value="request" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Return Request Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReturnSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Order Number *</label>
                      <Input
                        placeholder="Enter your order number"
                        value={returnForm.orderNumber}
                        onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can find this in your order confirmation email
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={returnForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Reason for Return *</label>
                      <select 
                        className="w-full p-2 border border-input bg-background rounded-md"
                        value={returnForm.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                        required
                      >
                        <option value="">Select a reason</option>
                        <option value="defective">Item is defective</option>
                        <option value="wrong-item">Wrong item received</option>
                        <option value="not-as-described">Item not as described</option>
                        <option value="changed-mind">Changed my mind</option>
                        <option value="damaged-shipping">Damaged during shipping</option>
                        <option value="quality-issues">Quality issues</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea
                        placeholder="Please provide additional details about your return..."
                        value={returnForm.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                      Submit Return Request
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Instant Confirmation</h4>
                        <p className="text-sm text-muted-foreground">You'll receive an email confirmation immediately</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Return Label Sent</h4>
                        <p className="text-sm text-muted-foreground">We'll email you a prepaid return label within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Package & Ship</h4>
                        <p className="text-sm text-muted-foreground">Package your item and drop it off at any shipping location</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Refund Processed</h4>
                        <p className="text-sm text-muted-foreground">Once we receive your item, we'll process your refund</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Immediate Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Call Us</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Email Us</p>
                        <p className="text-sm text-muted-foreground">returns@gadgetstore.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          id: "order-1",
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International orders may take 7-14 business days depending on your location."
        },
        {
          id: "order-2",
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over $50 within the United States. For orders under $50, shipping costs $5.99."
        },
        {
          id: "order-3",
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package on our website or directly through the carrier's website."
        },
        {
          id: "order-4",
          question: "Can I change or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After that, orders enter our fulfillment process and cannot be changed. Please contact us immediately if you need to make changes."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          id: "return-1",
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories. Some items like personalized products or software cannot be returned."
        },
        {
          id: "return-2",
          question: "How do I return an item?",
          answer: "To return an item, log into your account, go to 'Order History', and select 'Return Item' next to the product. Follow the instructions to print a return label and ship the item back to us."
        },
        {
          id: "return-3",
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will appear on your original payment method within 5-10 business days."
        },
        {
          id: "return-4",
          question: "Can I exchange an item for a different size or color?",
          answer: "Yes, we offer exchanges for different sizes or colors within 30 days. The exchange process is similar to returns - just select 'Exchange' instead of 'Return' in your order history."
        }
      ]
    },
    {
      category: "Products & Warranties",
      questions: [
        {
          id: "product-1",
          question: "Are all products genuine and new?",
          answer: "Yes, all our products are 100% genuine and brand new. We source directly from manufacturers and authorized distributors to ensure authenticity."
        },
        {
          id: "product-2",
          question: "Do products come with warranty?",
          answer: "Yes, all products come with the manufacturer's warranty. Warranty periods vary by product - typically 1-2 years for electronics. Warranty information is listed on each product page."
        },
        {
          id: "product-3",
          question: "What if I receive a defective product?",
          answer: "If you receive a defective product, contact us immediately. We'll arrange for a replacement or full refund at no cost to you. Defective items can be returned even after the standard return period."
        },
        {
          id: "product-4",
          question: "Do you offer technical support for products?",
          answer: "While we don't provide technical support for individual products, we can help connect you with the manufacturer's support team. Many products also come with detailed manuals and online resources."
        }
      ]
    },
    {
      category: "Payment & Security",
      questions: [
        {
          id: "payment-1",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely."
        },
        {
          id: "payment-2",
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We're PCI DSS compliant and never store your full credit card details on our servers."
        },
        {
          id: "payment-3",
          question: "Why was my payment declined?",
          answer: "Payment declines can happen for various reasons: insufficient funds, incorrect billing information, or bank security measures. Please check your information and try again, or contact your bank."
        },
        {
          id: "payment-4",
          question: "Do you offer payment plans or financing?",
          answer: "Yes, we partner with financing companies to offer payment plans on purchases over $200. You can see financing options at checkout for eligible items."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          id: "account-1",
          question: "Do I need an account to make a purchase?",
          answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, view order history, and receive exclusive offers."
        },
        {
          id: "account-2",
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a link to reset your password. If you don't receive the email, check your spam folder."
        },
        {
          id: "account-3",
          question: "How is my personal information protected?",
          answer: "We take privacy seriously and follow strict data protection guidelines. Your information is encrypted, never sold to third parties, and only used to process orders and improve your experience."
        },
        {
          id: "account-4",
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account by contacting our customer service team. Please note that this action is irreversible and will permanently remove your order history and saved information."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse all categories above.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;

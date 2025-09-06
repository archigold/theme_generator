const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using GadgetStore, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Products and Services</h2>
              <p className="text-muted-foreground mb-4">
                All products and services are subject to availability. We reserve the right to discontinue any product at any time.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product descriptions and prices are subject to change</li>
                <li>We strive for accuracy but cannot guarantee all information is error-free</li>
                <li>Colors and appearance may vary from photos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Orders and Payment</h2>
              <p className="text-muted-foreground mb-4">
                When you place an order, you agree to provide accurate and complete information.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>Payment is due at the time of order</li>
                <li>We accept major credit cards and PayPal</li>
                <li>Prices are in USD and exclude shipping costs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Shipping and Returns</h2>
              <p className="text-muted-foreground mb-4">
                We offer various shipping options to meet your needs:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy for unused items</li>
                <li>Original packaging required for returns</li>
                <li>Return shipping costs may apply</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall GadgetStore be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground">Email: legal@gadgetstore.com</p>
                <p className="text-foreground">Phone: +1 (555) 123-4567</p>
                <p className="text-foreground">Address: 123 Tech Street, San Francisco, CA</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
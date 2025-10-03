const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Essential cookies:</strong> Required for basic website functionality</li>
                <li><strong>Performance cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Functionality cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Session Cookies</h3>
                  <p className="text-muted-foreground">Temporary cookies that expire when you close your browser.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Persistent Cookies</h3>
                  <p className="text-muted-foreground">Remain on your device for a set period or until you delete them.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Third-Party Cookies</h3>
                  <p className="text-muted-foreground">Set by external services we use, such as analytics providers.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use our cookie banner to set your preferences</li>
                <li>Configure your browser settings to block or delete cookies</li>
                <li>Use browser extensions to manage cookies</li>
                <li>Opt out of third-party tracking through industry tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground">Email: privacy@gadgetstore.com</p>
                <p className="text-foreground">Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
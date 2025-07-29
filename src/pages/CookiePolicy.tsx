import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 mb-4"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-green-800 mb-3">Essential Cookies</h3>
                  <p className="text-green-700 mb-3">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                  <ul className="list-disc pl-6 text-green-700 space-y-1">
                    <li>Authentication and security cookies</li>
                    <li>Shopping cart and session management</li>
                    <li>Load balancing and performance</li>
                  </ul>
                  <p className="text-sm text-green-600 mt-3 font-medium">Legal basis: Legitimate interest</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-blue-800 mb-3">Functional Cookies</h3>
                  <p className="text-blue-700 mb-3">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc pl-6 text-blue-700 space-y-1">
                    <li>Language and region preferences</li>
                    <li>Theme and display settings</li>
                    <li>Recently viewed items</li>
                    <li>Form auto-fill information</li>
                  </ul>
                  <p className="text-sm text-blue-600 mt-3 font-medium">Legal basis: Consent</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-yellow-800 mb-3">Analytics Cookies</h3>
                  <p className="text-yellow-700 mb-3">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc pl-6 text-yellow-700 space-y-1">
                    <li>Google Analytics (anonymized IP)</li>
                    <li>Page views and user journeys</li>
                    <li>Performance monitoring</li>
                    <li>Error tracking and debugging</li>
                  </ul>
                  <p className="text-sm text-yellow-600 mt-3 font-medium">Legal basis: Consent</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-purple-800 mb-3">Marketing Cookies</h3>
                  <p className="text-purple-700 mb-3">
                    These cookies are used to deliver relevant advertisements and track campaign effectiveness.
                  </p>
                  <ul className="list-disc pl-6 text-purple-700 space-y-1">
                    <li>Social media integration</li>
                    <li>Advertising campaign tracking</li>
                    <li>Remarketing and retargeting</li>
                    <li>A/B testing for marketing</li>
                  </ul>
                  <p className="text-sm text-purple-600 mt-3 font-medium">Legal basis: Consent</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use services from trusted third parties that may set their own cookies:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-600 mb-2">Website usage analytics</p>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Stripe</h4>
                  <p className="text-sm text-gray-600 mb-2">Payment processing</p>
                  <a 
                    href="https://stripe.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Supabase</h4>
                  <p className="text-sm text-gray-600 mb-2">Database and authentication</p>
                  <a 
                    href="https://supabase.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Cloudflare</h4>
                  <p className="text-sm text-gray-600 mb-2">CDN and security</p>
                  <a 
                    href="https://www.cloudflare.com/privacypolicy/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Managing Your Cookie Preferences</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Cookie Consent Banner</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you first visit our website, you'll see a cookie consent banner where you can 
                    choose which types of cookies to accept. You can change these preferences at any time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Browser Settings</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You can also control cookies through your browser settings:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">⚠️ Important Note</h4>
                  <p className="text-amber-700 text-sm">
                    Disabling certain cookies may affect the functionality of our website. 
                    Essential cookies cannot be disabled as they are necessary for basic website operations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookie Retention Periods</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cookie Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Session</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Browser session</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Login state, shopping cart</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Persistent</td>
                      <td className="px-4 py-3 text-sm text-gray-600">30 days - 2 years</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Preferences, analytics</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Third-party</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Varies by provider</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Analytics, advertising</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under GDPR and other privacy laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Know what cookies are being used</li>
                <li>Give or withdraw consent for non-essential cookies</li>
                <li>Access information about how cookies are used</li>
                <li>Request deletion of cookie data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this cookie policy to reflect changes in technology, legislation, or our practices. 
                We'll notify you of significant changes through our website or by email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about our use of cookies:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@peruseai.com</p>
                  <p><strong>Subject:</strong> Cookie Policy Inquiry</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
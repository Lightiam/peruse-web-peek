import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Peruse AI ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our website 
                previewing service and marketplace platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Personal Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Name and email address when you create an account</li>
                    <li>Profile information you choose to provide</li>
                    <li>Payment information for marketplace transactions</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Usage Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Websites you request to preview</li>
                    <li>Search queries and filter preferences</li>
                    <li>Platform usage patterns and interactions</li>
                    <li>Device information and browser type</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Technical Information</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>IP address and location data</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Website performance and error logs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and improve our website preview services</li>
                <li>To facilitate marketplace transactions between users</li>
                <li>To personalize your experience and recommendations</li>
                <li>To communicate with you about our services</li>
                <li>To ensure platform security and prevent fraud</li>
                <li>To comply with legal obligations</li>
                <li>To analyze usage patterns and improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Legal Basis for Processing (GDPR)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under the General Data Protection Regulation (GDPR), we process your personal data based on:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Consent:</strong> When you agree to marketing communications</li>
                <li><strong>Contract:</strong> To fulfill our services and marketplace transactions</li>
                <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Other users in the marketplace (limited profile information)</li>
                <li>Service providers who assist in operating our platform</li>
                <li>Payment processors for transaction handling</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                We never sell your personal data to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights Under GDPR</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you're in the EU, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Transfer your data to another service</li>
                <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, contact us at privacy@peruseai.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal data only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Account data: Until account deletion or 3 years of inactivity</li>
                <li>Transaction data: 7 years for legal and tax purposes</li>
                <li>Usage logs: 2 years for service improvement</li>
                <li>Marketing data: Until consent is withdrawn</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                Your data may be transferred to and processed in countries outside your residence. 
                We ensure adequate protection through standard contractual clauses and other approved mechanisms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy periodically. We'll notify you of significant changes by email 
                or through our platform. Continued use of our services after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  For questions about this privacy policy or to exercise your rights:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@peruseai.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@peruseai.com</p>
                  <p><strong>Address:</strong> [Your Company Address]</p>
                </div>
                <p className="text-gray-600 mt-4">
                  EU residents can also contact your local data protection authority.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
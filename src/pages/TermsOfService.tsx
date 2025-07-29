import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Peruse AI ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Peruse AI provides:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Website preview and screenshot generation services</li>
                <li>A marketplace platform connecting clients with developers and designers</li>
                <li>Project management and communication tools</li>
                <li>Secure payment processing and escrow services</li>
                <li>User profiles and portfolio showcasing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Account Requirements</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>You must be at least 18 years old to create an account</li>
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>One person may not maintain multiple accounts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Account Responsibilities</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>You are liable for all activities under your account</li>
                    <li>Provide accurate profile and portfolio information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Marketplace Terms</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-blue-800 mb-3">For Clients</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li>Provide clear and accurate project descriptions</li>
                    <li>Communicate professionally with service providers</li>
                    <li>Make payments as agreed upon in project terms</li>
                    <li>Provide timely feedback and project requirements</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-green-800 mb-3">For Service Providers</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>Accurately represent your skills and experience</li>
                    <li>Deliver work as specified in project agreements</li>
                    <li>Meet agreed-upon deadlines and milestones</li>
                    <li>Communicate regularly with clients</li>
                    <li>Provide original work or properly licensed content</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Fees and Payments</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Platform fees are clearly displayed before transaction</li>
                    <li>All payments are processed securely through our payment partners</li>
                    <li>Refunds are subject to our refund policy</li>
                    <li>You're responsible for any applicable taxes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Escrow System</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Payments are held in escrow until project completion</li>
                    <li>Funds are released upon client approval or automatic release terms</li>
                    <li>Disputes may delay payment release</li>
                    <li>Platform fees are deducted before payment to service providers</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Your Content</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You retain ownership of intellectual property rights in content you create or upload. 
                    However, you grant us a license to use, display, and distribute this content as necessary 
                    to provide our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Platform Content</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our platform, including its design, functionality, and original content, is protected by 
                    copyright and other intellectual property laws. You may not copy, modify, or distribute 
                    our platform content without permission.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Project Deliverables</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Upon full payment, clients receive the agreed-upon rights to project deliverables as 
                    specified in the project agreement. This typically includes exclusive rights to the 
                    final work product.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Prohibited Activities</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-medium text-red-800 mb-3">You may not:</h3>
                <ul className="list-disc pl-6 text-red-700 space-y-2">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Violate any laws in your jurisdiction</li>
                  <li>Transmit any worms, viruses, or destructive code</li>
                  <li>Collect user information without consent</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Create fake reviews or ratings</li>
                  <li>Circumvent payment systems</li>
                  <li>Upload offensive, defamatory, or infringing content</li>
                  <li>Spam or harass other users</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Dispute Resolution</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Platform Mediation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We provide a dispute resolution process for project-related conflicts. Our team will 
                    review evidence and make fair determinations regarding payment release and project completion.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Arbitration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Any disputes not resolved through our platform process will be settled through binding 
                    arbitration in accordance with the rules of [Arbitration Organization] in [Jurisdiction].
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-800 leading-relaxed">
                  Peruse AI shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
                  losses, resulting from your use of the service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Service Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                We may temporarily suspend service for maintenance, updates, or other operational reasons. 
                We are not liable for any losses resulting from service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Account Termination</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Termination by You</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You may terminate your account at any time by contacting us. Upon termination, you lose 
                    access to all account features and data.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Termination by Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may terminate accounts that violate these terms or engage in harmful activities. 
                    We'll provide notice when possible, but reserve the right to immediate termination for 
                    serious violations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We'll notify users of significant 
                changes by email or through our platform. Continued use of the service after changes 
                constitutes acceptance of new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be interpreted in accordance with the laws of [Your Jurisdiction], 
                without regard to conflict of law provisions. Any legal action relating to these terms 
                must be brought in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Questions about these Terms of Service? Contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> legal@peruseai.com</p>
                  <p><strong>Address:</strong> [Your Company Address]</p>
                  <p><strong>Phone:</strong> [Your Phone Number]</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
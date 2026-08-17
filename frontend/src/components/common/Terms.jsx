// frontend/src/components/common/Terms.jsx
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Clock,
  Users,
  ShieldCheck,
  FileCheck,
  Globe,
  Mail,
  Server
} from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-sm text-gray-500">Last updated: August 17, 2026</p>
              </div>
            </div>
            <Link 
              to="/auth" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </div>

          <div className="prose prose-blue max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Please read these terms carefully before using EventManager. By using our service, you agree to these terms.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to EventManager! These Terms of Service govern your use of EventManager's platform, 
                including all features, tools, and services provided through our website and mobile applications.
              </p>
            </section>

            {/* Account Terms */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                2. Account Terms
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You must be at least 18 years old to use EventManager.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You must provide accurate and complete information when creating your account.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You are responsible for maintaining the security of your account credentials.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You must notify us immediately of any unauthorized use of your account.</span>
                </li>
              </ul>
            </section>

            {/* User Responsibilities */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
                3. User Responsibilities
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">You Agree To:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Comply with all applicable laws</li>
                    <li>• Respect intellectual property rights</li>
                    <li>• Provide accurate event information</li>
                    <li>• Maintain data privacy</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">You Agree Not To:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Misuse the platform</li>
                    <li>• Post harmful content</li>
                    <li>• Violate others' privacy</li>
                    <li>• Engage in fraudulent activities</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Event Management */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                4. Event Management
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You are responsible for the accuracy of all event details you post.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Event hosts must clearly communicate any changes or cancellations.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>We reserve the right to remove events that violate our policies.</span>
                </li>
              </ul>
            </section>

            {/* Payments */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Server className="h-5 w-5 text-blue-600 mr-2" />
                5. Payments and Fees
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>EventManager may charge fees for certain premium features.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>All fees are clearly displayed before payment.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Refunds are processed according to our refund policy.</span>
                </li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <FileCheck className="h-5 w-5 text-blue-600 mr-2" />
                6. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account if you violate these terms. 
                You may also delete your account at any time through your account settings.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
                7. Disclaimer of Warranties
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  EventManager is provided "as is" without warranties of any kind. We do not guarantee 
                  uninterrupted or error-free service. Your use of the platform is at your own risk.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 mr-2" />
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, EventManager shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages arising from your use of the platform.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                9. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the 
                United States, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                10. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@EventManager.com" className="text-blue-600 hover:text-blue-500 font-medium">
                  legal@EventManager.com
                </a>
              </p>
            </section>

            {/* Acceptance */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-800">
                By using EventManager, you acknowledge that you have read, understood, and agree to be bound 
                by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
// frontend/src/components/common/Privacy.jsx
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  Database,
  Lock,
  Eye,
  Mail,
  Cookie,
  Users,
  Server,
  ShieldCheck,
  FileText,
  Globe,
  Clock,
  AlertCircle
} from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy</h1>
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
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At EventManager, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Database className="h-5 w-5 text-blue-600 mr-2" />
                2. Information We Collect
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Full name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Company name</li>
                    <li>• Profile photo</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Server className="h-4 w-4 text-indigo-600 mr-2" />
                    Usage Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Event preferences</li>
                    <li>• Browsing history</li>
                    <li>• Device information</li>
                    <li>• IP address</li>
                    <li>• Cookies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Eye className="h-5 w-5 text-blue-600 mr-2" />
                3. How We Use Your Information
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>To provide and maintain our event management services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>To personalize your experience and recommend events</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>To send you updates, notifications, and promotional offers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>To improve our platform and develop new features</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Lock className="h-5 w-5 text-blue-600 mr-2" />
                4. Data Security
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  However, no method of transmission over the internet is 100% secure.
                </p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                    <Lock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">256-bit Encryption</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                    <ShieldCheck className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">SSL Security</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                    <Server className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Secure Servers</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Cookie className="h-5 w-5 text-blue-600 mr-2" />
                5. Cookies
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  We use cookies to enhance your experience, analyze site traffic, and serve personalized content. 
                  You can manage your cookie preferences in your browser settings.
                </p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                6. Third-Party Services
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may use third-party services for payment processing, analytics, and marketing. 
                These services have their own privacy policies and may collect information in accordance 
                with their terms.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                7. Your Rights
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    You Have the Right To:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Access your personal data</li>
                    <li>• Correct inaccurate data</li>
                    <li>• Request data deletion</li>
                    <li>• Opt-out of marketing</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    Response Time:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• We respond within 30 days</li>
                    <li>• Free of charge for requests</li>
                    <li>• We may verify your identity</li>
                    <li>• Requests processed securely</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                8. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, and resolve disputes. You may request deletion of your 
                data at any time.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                9. Children's Privacy
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  EventManager is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you believe we have collected 
                  such information, please contact us immediately.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                10. Changes to Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center mb-3">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                11. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or concerns about our Privacy Policy, please contact our 
                Data Protection Officer at{' '}
                <a href="mailto:privacy@EventManager.com" className="text-blue-600 hover:text-blue-500 font-medium">
                  privacy@EventManager.com
                </a>
              </p>
              <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-1">Contact Information:</h4>
                <p className="text-sm text-gray-600">
                  EventManager Data Protection Team<br />
                  123 Tech Park, Silicon Valley, CA 94025<br />
                  <a href="mailto:privacy@EventManager.com" className="text-blue-600 hover:text-blue-500">
                    privacy@EventManager.com
                  </a><br />
                  Phone: +1 (555) 000-0000
                </p>
              </div>
            </section>

            {/* Acceptance */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-800">
                By using EventManager, you consent to the collection and use of your information as described 
                in this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
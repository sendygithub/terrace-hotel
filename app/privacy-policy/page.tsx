import { Metadata } from "next";
import Headersection from "@/components/header-section";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Terrace Hotel",
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Headersection
        title="Privacy Policy"
        subtitle="How we protect your personal information"
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IoShieldCheckmarkOutline className="size-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <div className="prose max-w-none text-gray-600 space-y-6">
            <p>
              At Terrace Hotel, we take your privacy seriously. This privacy
              policy describes how we collect, use, and protect your personal
              information when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as your
              name, email address, phone number, and payment information when
              making a reservation. We also automatically collect certain
              information about your device and browsing behavior.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to process reservations, communicate with
              you about your booking, improve our services, and send you
              promotional offers with your consent. We do not sell your personal
              information to third parties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              3. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. All payment transactions are encrypted
              using SSL technology.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              4. Cookies
            </h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You
              can control cookie settings through your browser preferences.
              Disabling cookies may affect certain features of our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or how we
              handle your personal information, please contact us through our
              contact page or email us at privacy@terracehotel.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

import { Metadata } from "next";
import Headersection from "@/components/header-section";
import { IoDocumentTextOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for Terrace Hotel",
};

const TermsPage = () => {
  return (
    <div>
      <Headersection
        title="Terms and Conditions"
        subtitle="Please read our terms and conditions carefully"
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IoDocumentTextOutline className="size-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Terms and Conditions
            </h1>
          </div>
          <div className="prose max-w-none text-gray-600 space-y-6">
            <p>
              Welcome to Terrace Hotel. By accessing our website and making a
              reservation, you agree to comply with and be bound by the
              following terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              1. Acceptance of Terms
            </h2>
            <p>
              By using our website and services, you acknowledge that you have
              read, understood, and agree to be bound by these terms and
              conditions. If you do not agree with any part of these terms,
              please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              2. Guest Responsibilities
            </h2>
            <p>
              Guests are responsible for providing accurate information during
              the booking process. Any damages caused to hotel property during
              your stay will be charged to the guest. Guests must comply with
              all hotel policies and regulations.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              3. Check-in and Check-out
            </h2>
            <p>
              Standard check-in time is 14:00 PM and check-out time is 12:00 PM
              noon. Early check-in and late check-out are subject to
              availability and may incur additional charges.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              4. Modifications to Terms
            </h2>
            <p>
              Terrace Hotel reserves the right to modify these terms and
              conditions at any time without prior notice. Continued use of our
              services after any modifications constitutes acceptance of the new
              terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              5. Governing Law
            </h2>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of the Republic of Indonesia. Any
              disputes arising from these terms shall be resolved in the courts
              of Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

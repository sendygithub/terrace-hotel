import { Metadata } from "next";
import Headersection from "@/components/header-section";
import { IoCashOutline, IoCardOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Payment Methods",
  description: "Payment methods accepted at Terrace Hotel",
};

const PaymentMethodsPage = () => {
  return (
    <div>
      <Headersection
        title="Payment Methods"
        subtitle="Convenient payment options for your stay"
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IoCardOutline className="size-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Payment Methods
            </h1>
          </div>

          <p className="text-gray-600 mb-10">
            We offer various payment methods to make your booking experience
            convenient and secure. Choose the option that works best for you.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bank Transfer BNI */}
            <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">BNI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Bank Transfer BNI
                  </h3>
                  <p className="text-xs text-gray-400">
                    Transfer to BNI account
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <span className="font-medium text-gray-700">
                    Account Number:
                  </span>{" "}
                  1234567890
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Account Name:
                  </span>{" "}
                  PT. Codermedia Hospitality
                </p>
              </div>
            </div>

            {/* Bank Transfer BCA */}
            <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-sm flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">BCA</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Bank Transfer BCA
                  </h3>
                  <p className="text-xs text-gray-400">
                    Transfer to BCA account
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <span className="font-medium text-gray-700">
                    Account Number:
                  </span>{" "}
                  0987654321
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Account Name:
                  </span>{" "}
                  PT. Codermedia Hospitality
                </p>
              </div>
            </div>

            {/* Pay at Hotel */}
            <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                  <IoCashOutline className="size-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pay at Hotel</h3>
                  <p className="text-xs text-gray-400">Pay when you check-in</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                You can make payment directly at the hotel front desk upon
                check-in. We accept cash and all major credit cards.
              </p>
            </div>

            {/* Online Payment */}
            <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                  <IoCardOutline className="size-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Online Payment
                  </h3>
                  <p className="text-xs text-gray-400">Secure online payment</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Pay securely online using your credit or debit card. We accept
                Visa, Mastercard, and other major cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;

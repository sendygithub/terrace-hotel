import { Metadata } from "next";
import Headersection from "@/components/header-section";
import { IoScaleOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal information for Terrace Hotel",
};

const LegalPage = () => {
  return (
    <div>
      <Headersection title="Legal" subtitle="Legal information and policies" />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IoScaleOutline className="size-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Legal Information
            </h1>
          </div>
          <div className="prose max-w-none text-gray-600 space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              1. Company Information
            </h2>
            <p>
              Terrace Hotel is operated by PT. Codermedia Hospitality. Our
              registered office is located at Jakarta, Indonesia. We are
              committed to providing the highest quality accommodation and
              services to our guests.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              2. Booking and Reservation
            </h2>
            <p>
              All bookings made through our website are subject to availability
              and confirmation. We reserve the right to cancel or modify
              reservations where circumstances require. Guests must provide
              accurate information when making a reservation.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              3. Payment Terms
            </h2>
            <p>
              Payment must be made in accordance with the selected payment
              method and terms. All prices are listed in Indonesian Rupiah (IDR)
              and include applicable taxes unless stated otherwise.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              4. Cancellation Policy
            </h2>
            <p>
              Cancellation policies vary depending on the room type and rate
              plan selected. Please refer to the specific terms provided during
              the booking process. Late cancellations may incur charges.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              5. Liability
            </h2>
            <p>
              Terrace Hotel shall not be liable for any loss, damage, or injury
              to persons or property except where caused by our negligence.
              Guests are advised to secure their personal belongings and use
              hotel safety facilities provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

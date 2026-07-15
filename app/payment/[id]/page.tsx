"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoCashOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import Headersection from "@/components/header-section";

interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string | null;
}

interface Room {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
}

interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  price: number;
  Room: Room;
  payment: Payment | null;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const PaymentPage = () => {
  const params = useParams();
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(`/api/reservations/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setReservation(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReservation();
    }
  }, [params.id]);

  const handlePayment = async (method: string) => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/reservations/${params.id}/pay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method }),
        });

        if (res.ok) {
          setSuccess(true);
          setMessage("");
        } else {
          const data = await res.json();
          setMessage(data.error || "Payment failed");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong");
      }
    });
  };

  if (loading) {
    return (
      <div>
        <Headersection title="Payment" subtitle="Complete your payment" />
        <div className="max-w-screen-xl mx-auto py-20 px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded max-w-lg mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div>
        <Headersection title="Payment" subtitle="Complete your payment" />
        <div className="max-w-screen-xl mx-auto py-20 px-4 text-center">
          <p className="text-gray-500">Reservation not found.</p>
          <Link
            href="/myreservation"
            className="inline-block mt-4 text-orange-500 hover:underline"
          >
            Back to My Reservations
          </Link>
        </div>
      </div>
    );
  }

  if (reservation.payment?.status === "paid") {
    return (
      <div>
        <Headersection title="Payment" subtitle="Complete your payment" />
        <div className="max-w-screen-xl mx-auto py-20 px-4">
          <div className="max-w-lg mx-auto bg-white rounded-sm shadow-sm p-8 text-center">
            <IoCheckmarkCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Already Paid
            </h2>
            <p className="text-gray-500 mb-6">
              This reservation has already been paid.
            </p>
            <Link
              href="/myreservation"
              className="inline-block px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500"
            >
              View My Reservations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div>
        <Headersection
          title="Payment Successful"
          subtitle="Thank you for your payment"
        />
        <div className="max-w-screen-xl mx-auto py-20 px-4">
          <div className="max-w-lg mx-auto bg-white rounded-sm shadow-sm p-8 text-center">
            <IoCheckmarkCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-500 mb-6">
              Your payment has been processed successfully.
            </p>
            <Link
              href="/myreservation"
              className="inline-block px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500"
            >
              View My Reservations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Headersection title="Payment" subtitle="Complete your payment" />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-lg mx-auto">
          {/* Back Button */}
          <Link
            href="/myreservation"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <IoArrowBack />
            Back to My Reservations
          </Link>

          {/* Reservation Summary */}
          <div className="bg-white rounded-sm shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Reservation Summary
            </h2>

            <div className="flex gap-4 mb-4">
              <div className="w-20 h-16 rounded-sm overflow-hidden flex-shrink-0">
                <Image
                  src={reservation.Room.image}
                  alt={reservation.Room.name}
                  width={80}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {reservation.Room.name}
                </h3>
                <p className="text-xs text-gray-400">
                  ID: {reservation.id.slice(0, 8)}...
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <IoCalendarOutline className="text-gray-400 size-4" />
                <span className="text-gray-500">Check-in:</span>
                <span className="font-medium text-gray-700">
                  {formatDate(reservation.startDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoCalendarOutline className="text-gray-400 size-4" />
                <span className="text-gray-500">Check-out:</span>
                <span className="font-medium text-gray-700">
                  {formatDate(reservation.endDate)}
                </span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IoCashOutline className="text-gray-400 size-5" />
                  <span className="font-semibold text-gray-800">
                    Total Amount
                  </span>
                </div>
                <span className="text-2xl font-bold text-orange-500">
                  {formatPrice(reservation.price)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Method
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Select a payment method to complete your booking.
            </p>

            {message && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm">
                <p className="text-sm text-red-600">{message}</p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => handlePayment("bank_transfer")}
                disabled={pending}
                className="w-full p-4 border border-gray-200 rounded-sm hover:border-orange-400 hover:bg-orange-50 transition-all text-left disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">BNI</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Bank Transfer (BNI)
                    </p>
                    <p className="text-xs text-gray-400">
                      Transfer to BNI account
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handlePayment("bank_transfer")}
                disabled={pending}
                className="w-full p-4 border border-gray-200 rounded-sm hover:border-orange-400 hover:bg-orange-50 transition-all text-left disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-sm flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">BCA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Bank Transfer (BCA)
                    </p>
                    <p className="text-xs text-gray-400">
                      Transfer to BCA account
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handlePayment("cash")}
                disabled={pending}
                className="w-full p-4 border border-gray-200 rounded-sm hover:border-orange-400 hover:bg-orange-50 transition-all text-left disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
                    <IoCashOutline className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Pay at Hotel</p>
                    <p className="text-xs text-gray-400">
                      Pay when you check-in
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {pending && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Processing payment...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

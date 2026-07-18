"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IoArrowBack,
  IoCalendarOutline,
  IoCashOutline,
  IoTimeOutline,
  IoPrintOutline,
  IoCheckmarkCircle,
  IoLocationOutline,
} from "react-icons/io5";
import Headersection from "@/components/header-section";

interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string | null;
  createdAt: string;
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
  createdAt: string;
  updatedAt: string;
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

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calculateNights(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const statusColors: Record<string, string> = {
  unpaid: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const statusLabels: Record<string, string> = {
  unpaid: "Unpaid",
  paid: "Paid",
  cancelled: "Cancelled",
  pending: "Pending",
};

const ReservationDetailPage = () => {
  const params = useParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(`/api/reservations/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setReservation(data);
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReservation();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <Headersection title="Reservation Detail" subtitle="Booking details" />
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
        <Headersection title="Reservation Detail" subtitle="Booking details" />
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

  const nights = calculateNights(reservation.startDate, reservation.endDate);
  const paymentStatus = reservation.payment?.status || "unpaid";

  return (
    <div>
      <Headersection
        title="Reservation Detail"
        subtitle="View your complete booking information"
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/myreservation"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <IoArrowBack />
            Back to My Reservations
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            {/* Room Image */}
            <div className="h-64 md:h-80 relative overflow-hidden">
              <Image
                src={reservation.Room.image}
                alt={reservation.Room.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h2 className="text-2xl font-bold text-white">
                  {reservation.Room.name}
                </h2>
                <p className="text-white/80 text-sm capitalize">
                  {reservation.Room.type} Room
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    statusColors[paymentStatus] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusLabels[paymentStatus] || paymentStatus}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 md:p-8">
              {/* Reservation ID */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Reservation ID</p>
                <p className="text-sm font-mono text-gray-700">
                  {reservation.id}
                </p>
              </div>

              {/* Date & Stay Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-2">CHECK-IN</p>
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="text-orange-400 size-5" />
                    <span className="font-semibold text-gray-800">
                      {formatDate(reservation.startDate)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">CHECK-OUT</p>
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="text-orange-400 size-5" />
                    <span className="font-semibold text-gray-800">
                      {formatDate(reservation.endDate)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">NIGHTS</p>
                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="text-orange-400 size-5" />
                    <span className="font-semibold text-gray-800">
                      {nights} night{nights > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">ROOM TYPE</p>
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-orange-400 size-5" />
                    <span className="font-semibold text-gray-800 capitalize">
                      {reservation.Room.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Payment Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      {paymentStatus === "paid" ? (
                        <IoCheckmarkCircle className="text-green-500 size-4" />
                      ) : (
                        <IoCashOutline className="text-yellow-500 size-4" />
                      )}
                      <span className="font-medium text-gray-700">
                        {statusLabels[paymentStatus] || paymentStatus}
                      </span>
                    </div>
                  </div>
                  {reservation.payment?.method && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Payment Method
                      </p>
                      <p className="font-medium text-gray-700 capitalize">
                        {reservation.payment.method === "bank_transfer"
                          ? "Bank Transfer"
                          : reservation.payment.method === "cash"
                            ? "Pay at Hotel"
                            : reservation.payment.method}
                      </p>
                    </div>
                  )}
                  {reservation.payment?.createdAt && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Payment Date</p>
                      <p className="font-medium text-gray-700">
                        {formatDateTime(reservation.payment.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <IoCashOutline className="text-orange-400 size-6" />
                  <span className="text-lg font-semibold text-gray-800">
                    Total Amount
                  </span>
                </div>
                <span className="text-2xl font-bold text-orange-500">
                  {formatPrice(reservation.price)}
                </span>
              </div>

              {/* Booked Date */}
              <p className="text-xs text-gray-400">
                Booked on {formatDateTime(reservation.createdAt)}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                {paymentStatus === "unpaid" && (
                  <Link
                    href={`/payment/${reservation.id}`}
                    className="px-6 py-2.5 bg-orange-400 text-white text-sm font-semibold rounded-sm hover:bg-orange-500 transition duration-150"
                  >
                    Pay Now
                  </Link>
                )}
                {paymentStatus === "paid" && (
                  <Link
                    href={`/payment/receipt/${reservation.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-sm hover:bg-blue-600 transition duration-150"
                  >
                    <IoPrintOutline className="size-4" />
                    Cetak Bukti Pembayaran
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoCashOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoPrintOutline,
  IoChevronForward,
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
  createdAt: string;
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

const MyReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/reservations");
        if (res.ok) {
          const data = await res.json();
          setReservations(data);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <Headersection
        title="My Reservations"
        subtitle="View and manage your bookings"
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-sm shadow-sm p-6 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-gray-200 rounded-sm"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-sm shadow-sm p-12 max-w-md mx-auto">
              <IoCalendarOutline className="size-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Reservations Yet
              </h2>
              <p className="text-gray-500 mb-6">
                You haven't made any reservations yet. Browse our rooms and book
                your stay!
              </p>
              <Link
                href="/room"
                className="inline-block px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500 transition duration-150"
              >
                Browse Rooms
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => {
              const nights = calculateNights(
                reservation.startDate,
                reservation.endDate,
              );
              const paymentStatus = reservation.payment?.status || "unpaid";

              return (
                <div
                  key={reservation.id}
                  className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Room Image */}
                    <div className="md:w-72 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                      <Image
                        src={reservation.Room.image}
                        alt={reservation.Room.name}
                        width={288}
                        height={192}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Reservation Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {reservation.Room.name}
                          </h3>
                          <span className="text-xs text-gray-400">
                            Reservation ID: {reservation.id.slice(0, 8)}...
                          </span>
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            statusColors[paymentStatus] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {statusLabels[paymentStatus] || paymentStatus}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <IoCalendarOutline className="text-gray-400 size-4" />
                          <div>
                            <span className="text-gray-500">Check-in: </span>
                            <span className="font-medium text-gray-700">
                              {formatDate(reservation.startDate)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoCalendarOutline className="text-gray-400 size-4" />
                          <div>
                            <span className="text-gray-500">Check-out: </span>
                            <span className="font-medium text-gray-700">
                              {formatDate(reservation.endDate)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoTimeOutline className="text-gray-400 size-4" />
                          <div>
                            <span className="text-gray-500">Nights: </span>
                            <span className="font-medium text-gray-700">
                              {nights} night{nights > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoCashOutline className="text-gray-400 size-4" />
                          <div>
                            <span className="text-gray-500">Total: </span>
                            <span className="font-semibold text-orange-500">
                              {formatPrice(reservation.price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-xs text-gray-400">
                          Booked on {formatDate(reservation.createdAt)}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Klik Detail Button - for all reservations */}
                          <Link
                            href={`/myreservation/${reservation.id}`}
                            className="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-sm hover:bg-gray-50 transition duration-150"
                          >
                            Klik Detail
                            <IoChevronForward className="size-3" />
                          </Link>

                          {paymentStatus === "unpaid" && (
                            <Link
                              href={`/payment/${reservation.id}`}
                              className="px-4 py-2 bg-orange-400 text-white text-sm font-semibold rounded-sm hover:bg-orange-500 transition duration-150"
                            >
                              Pay Now
                            </Link>
                          )}
                          {paymentStatus === "paid" && (
                            <>
                              <Link
                                href={`/payment/receipt/${reservation.id}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-sm hover:bg-blue-600 transition duration-150"
                              >
                                <IoPrintOutline className="size-4" />
                                Cetak Bukti Pembayaran
                              </Link>
                              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <IoCheckmarkCircle className="size-4" />
                                <span>Paid</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationPage;

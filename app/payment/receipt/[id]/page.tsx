"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IoArrowBack,
  IoPrintOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
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

const PaymentReceiptPage = () => {
  const params = useParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = () => {
    if (receiptRef.current) {
      const printContent = receiptRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Payment Receipt - Terrace Hotel</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 40px;
                  color: #333;
                }
                .receipt {
                  max-width: 600px;
                  margin: 0 auto;
                  border: 1px solid #e5e7eb;
                  padding: 32px;
                }
                .header {
                  text-align: center;
                  border-bottom: 2px solid #f97316;
                  padding-bottom: 20px;
                  margin-bottom: 24px;
                }
                .header h1 {
                  font-size: 24px;
                  color: #f97316;
                  margin: 0 0 4px 0;
                }
                .header p {
                  color: #6b7280;
                  font-size: 14px;
                  margin: 0;
                }
                .status-badge {
                  display: inline-block;
                  background: #d1fae5;
                  color: #065f46;
                  padding: 4px 12px;
                  border-radius: 9999px;
                  font-size: 12px;
                  font-weight: 600;
                }
                .section {
                  margin-bottom: 20px;
                }
                .section-title {
                  font-size: 14px;
                  font-weight: 600;
                  color: #374151;
                  margin-bottom: 8px;
                  border-bottom: 1px solid #e5e7eb;
                  padding-bottom: 4px;
                }
                .row {
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                  font-size: 14px;
                }
                .label {
                  color: #6b7280;
                }
                .value {
                  font-weight: 500;
                  color: #111827;
                }
                .total-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 12px 0;
                  border-top: 2px solid #f97316;
                  margin-top: 8px;
                  font-size: 18px;
                  font-weight: 700;
                }
                .total-label {
                  color: #374151;
                }
                .total-value {
                  color: #f97316;
                }
                .footer {
                  text-align: center;
                  margin-top: 24px;
                  padding-top: 16px;
                  border-top: 1px solid #e5e7eb;
                  font-size: 12px;
                  color: #9ca3af;
                }
                @media print {
                  body { padding: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Headersection
          title="Payment Receipt"
          subtitle="Print your payment receipt"
        />
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
        <Headersection
          title="Payment Receipt"
          subtitle="Print your payment receipt"
        />
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

  const paymentStatus = reservation.payment?.status || "unpaid";
  const nights = calculateNights(reservation.startDate, reservation.endDate);

  if (paymentStatus !== "paid") {
    return (
      <div>
        <Headersection
          title="Payment Receipt"
          subtitle="Print your payment receipt"
        />
        <div className="max-w-screen-xl mx-auto py-20 px-4">
          <div className="max-w-lg mx-auto bg-white rounded-sm shadow-sm p-8 text-center">
            <IoCashOutline className="size-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Not Completed
            </h2>
            <p className="text-gray-500 mb-6">
              This reservation has not been paid yet. Please complete the
              payment first.
            </p>
            <Link
              href={`/payment/${reservation.id}`}
              className="inline-block px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500"
            >
              Pay Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Headersection
        title="Payment Receipt"
        subtitle="Print your payment receipt"
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Action Buttons (not printed) */}
          <div className="no-print mb-6 flex items-center justify-between">
            <Link
              href={`/myreservation/${reservation.id}`}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <IoArrowBack />
              Back to Detail
            </Link>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-sm hover:bg-blue-600 transition duration-150"
            >
              <IoPrintOutline className="size-4" />
              Print / Save PDF
            </button>
          </div>

          {/* Receipt Content */}
          <div ref={receiptRef} className="bg-white rounded-sm shadow-sm p-8">
            {/* Header */}
            <div className="text-center border-b-2 border-orange-400 pb-6 mb-6">
              <h1 className="text-2xl font-bold text-orange-500 mb-1">
                Terrace Hotel
              </h1>
              <p className="text-sm text-gray-400">Payment Receipt</p>
            </div>

            {/* Status */}
            <div className="text-center mb-6">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                PAID
              </span>
            </div>

            {/* Reservation Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-3">
                Reservation Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Reservation ID</span>
                  <span className="font-medium text-gray-800 font-mono text-xs">
                    {reservation.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Room</span>
                  <span className="font-medium text-gray-800">
                    {reservation.Room.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Room Type</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {reservation.Room.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(reservation.startDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(reservation.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Nights</span>
                  <span className="font-medium text-gray-800">
                    {nights} night{nights > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-3">
                Payment Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment ID</span>
                  <span className="font-medium text-gray-800 font-mono text-xs">
                    {reservation.payment?.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {reservation.payment?.method === "bank_transfer"
                      ? "Bank Transfer"
                      : reservation.payment?.method === "cash"
                        ? "Pay at Hotel"
                        : reservation.payment?.method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Date</span>
                  <span className="font-medium text-gray-800">
                    {reservation.payment?.createdAt
                      ? formatDateTime(reservation.payment.createdAt)
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-green-600">Paid</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-3 border-t-2 border-orange-400 mt-2">
              <span className="text-lg font-bold text-gray-800">
                Total Amount
              </span>
              <span className="text-lg font-bold text-orange-500">
                {formatPrice(reservation.price)}
              </span>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200 text-xs text-gray-400">
              <p>Thank you for choosing Terrace Hotel!</p>
              <p className="mt-1">
                This is an electronically generated receipt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptPage;

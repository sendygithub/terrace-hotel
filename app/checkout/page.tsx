"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoPeopleOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";
import Headersection from "@/components/header-section";

interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  RoomAmenities: {
    id: string;
    Amenities: {
      name: string;
    };
  }[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function calculateNights(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomId = searchParams.get("roomId");

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`);
        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    // If end date is before or equal to new start date, reset end date
    if (endDate && newStart >= endDate) {
      setEndDate("");
    }
  };

  const nights = calculateNights(startDate, endDate);
  const totalPrice = room ? room.price * nights : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setMessage("Please select check-in and check-out dates");
      return;
    }

    if (nights < 1) {
      setMessage("Minimum stay is 1 night");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId,
            startDate,
            endDate,
            price: totalPrice,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setMessage("");
        } else {
          setMessage(data.error || "Failed to create reservation");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong. Please try again.");
      }
    });
  };

  if (!roomId) {
    return (
      <div>
        <Headersection title="Checkout" subtitle="Complete your booking" />
        <div className="max-w-screen-xl mx-auto py-20 px-4 text-center">
          <p className="text-gray-500 text-lg">No room selected.</p>
          <Link
            href="/room"
            className="inline-block mt-4 px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Headersection title="Checkout" subtitle="Complete your booking" />
        <div className="max-w-screen-xl mx-auto py-20 px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded max-w-2xl mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div>
        <Headersection title="Checkout" subtitle="Complete your booking" />
        <div className="max-w-screen-xl mx-auto py-20 px-4 text-center">
          <p className="text-gray-500 text-lg">Room not found.</p>
          <Link
            href="/room"
            className="inline-block mt-4 px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div>
        <Headersection
          title="Booking Successful"
          subtitle="Your reservation has been confirmed"
        />
        <div className="max-w-screen-xl mx-auto py-20 px-4">
          <div className="max-w-lg mx-auto bg-white rounded-sm shadow-sm p-8 text-center">
            <IoCheckmarkCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Booking Successful!
            </h2>
            <p className="text-gray-500 mb-6">
              Your reservation has been created. Please proceed to payment.
            </p>

            <div className="bg-gray-50 rounded-sm p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Room</span>
                <span className="font-semibold text-gray-800">{room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Check-in</span>
                <span className="font-semibold text-gray-800">
                  {new Date(startDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Check-out</span>
                <span className="font-semibold text-gray-800">
                  {new Date(endDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nights</span>
                <span className="font-semibold text-gray-800">{nights}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-800 font-semibold">Total</span>
                <span className="font-bold text-orange-500 text-lg">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-500">Payment Status</span>
                <span className="font-semibold text-yellow-600 bg-yellow-50 px-3 py-0.5 rounded-sm text-sm">
                  Unpaid
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Link
                href="/myreservation"
                className="px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500 transition duration-150"
              >
                View My Reservations
              </Link>
              <Link
                href="/room"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 transition duration-150"
              >
                Book Another Room
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Headersection title="Checkout" subtitle="Complete your booking" />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-12 gap-8">
            {/* Left - Booking Form */}
            <div className="md:col-span-7">
              <div className="bg-white rounded-sm shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Booking Details
                </h2>

                {/* Date Selection */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      min={today}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || today}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Room Info */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Selected Room
                  </h3>
                  <div className="flex gap-4">
                    <div className="w-24 h-20 rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={room.image}
                        alt={room.name}
                        width={96}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {room.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <IoPeopleOutline className="text-gray-400 size-3" />
                        <span className="text-xs text-gray-500">
                          Up to {room.capacity}{" "}
                          {room.capacity > 1 ? "guests" : "guest"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {room.RoomAmenities.slice(0, 6).map((ra) => (
                        <span
                          key={ra.id}
                          className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-sm"
                        >
                          <HiOutlineCheckCircle className="text-green-500" />
                          {ra.Amenities.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="md:col-span-5">
              <div className="bg-white rounded-sm shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IoCalendarOutline className="text-gray-400" />
                      <span className="text-gray-600">Nights</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {nights > 0
                        ? `${nights} night${nights > 1 ? "s" : ""}`
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IoCashOutline className="text-gray-400" />
                      <span className="text-gray-600">Price per night</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(room.price)}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-800">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-orange-500">
                        {nights > 0
                          ? formatPrice(totalPrice)
                          : formatPrice(room.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {message && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-sm">
                    <p className="text-sm text-red-600">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending || nights < 1}
                  className="w-full mt-6 py-3 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pending ? "Processing..." : "Confirm Booking"}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  You can pay later at the hotel or choose online payment
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const CheckOutPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Headersection title="Checkout" subtitle="Complete your booking" />
          <div className="max-w-screen-xl mx-auto py-20 px-4 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-64 bg-gray-200 rounded max-w-2xl mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckOutPage;

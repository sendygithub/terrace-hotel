import { Metadata } from "next";
import Headersection from "@/components/header-section";
import { getRooms } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Explore our rooms and rates",
};

const typeLabels: Record<string, string> = {
  deluxe: "Deluxe",
  premium: "Premium",
  suite: "Suite",
};

const typeColors: Record<string, string> = {
  deluxe: "bg-blue-100 text-blue-800",
  premium: "bg-purple-100 text-purple-800",
  suite: "bg-yellow-100 text-yellow-800",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const RoomPage = async () => {
  const rooms = await getRooms();

  return (
    <div>
      <Headersection
        title="Rooms & Rates"
        subtitle="Choose your perfect stay"
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        {rooms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No rooms available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white shadow-lg rounded-sm transition duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col"
              >
                <div className="h-[240px] w-auto rounded-t-sm relative overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={400}
                    height={240}
                    className="object-cover object-center w-full h-full rounded-t-sm hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[room.type] || "bg-gray-100 text-gray-800"}`}
                    >
                      {typeLabels[room.type] || room.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {room.RoomAmenities.slice(0, 4).map((ra) => (
                        <span
                          key={ra.id}
                          className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-sm"
                        >
                          <HiOutlineCheckCircle className="text-green-500" />
                          {ra.Amenities.name}
                        </span>
                      ))}
                      {room.RoomAmenities.length > 4 && (
                        <span className="text-xs text-gray-400">
                          +{room.RoomAmenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <IoPeopleOutline className="text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {room.capacity}{" "}
                        {room.capacity > 1 ? "People" : "Person"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">
                          {formatPrice(room.price)}
                        </span>
                        <span className="text-gray-400 text-sm"> /Night</span>
                      </div>
                      <Link
                        href={`/checkout?roomId=${room.id}`}
                        className="px-6 py-2.5 font-semibold text-white bg-orange-400 rounded-sm hover:bg-orange-500 transition duration-150 text-sm"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;

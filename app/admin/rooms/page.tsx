import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteRoomButton from "@/components/admin/room/delete-room-button";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

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

const AdminRoomsPage = async () => {
  const rooms = await prisma.room.findMany({
    include: {
      RoomAmenities: {
        include: {
          Amenities: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 mt-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Rooms</h1>
          <p className="text-gray-500 mt-1">
            Total {rooms.length} room{rooms.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/room/create"
          className="px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500 transition duration-150"
        >
          + Create Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-sm shadow-sm">
          <p className="text-gray-500 text-lg">No rooms found.</p>
          <Link
            href="/admin/room/create"
            className="inline-block mt-4 px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-sm hover:bg-orange-500"
          >
            Create your first room
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Amenities</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-sm overflow-hidden flex-shrink-0">
                          <Image
                            src={room.image}
                            alt={room.name}
                            width={64}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {room.name}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">
                            {room.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[room.type] || "bg-gray-100 text-gray-800"}`}
                      >
                        {typeLabels[room.type] || room.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {formatPrice(room.price)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {room.capacity} {room.capacity > 1 ? "People" : "Person"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {room.RoomAmenities.slice(0, 3).map((ra) => (
                          <span
                            key={ra.id}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm"
                          >
                            {ra.Amenities.name}
                          </span>
                        ))}
                        {room.RoomAmenities.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{room.RoomAmenities.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/room/edit/${room.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-sm hover:bg-blue-100"
                        >
                          Edit
                        </Link>
                        <DeleteRoomButton roomId={room.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoomsPage;

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditRoomForm from "@/components/admin/room/edit-room-form";

const EditRoomPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [room, amenities] = await Promise.all([
    prisma.room.findUnique({
      where: { id },
      include: {
        RoomAmenities: {
          include: {
            Amenities: true,
          },
        },
      },
    }),
    prisma.amenities.findMany(),
  ]);

  if (!room) {
    notFound();
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Room</h1>
      <EditRoomForm room={room} amenities={amenities} />
    </div>
  );
};

export default EditRoomPage;

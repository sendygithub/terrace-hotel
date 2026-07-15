import { prisma } from "@/lib/prisma";

export const getAmenities = async () => {
  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRooms = async () => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        RoomAmenities: {
          include: {
            Amenities: true,
          },
        },
      },
      orderBy: {
        price: "asc",
      },
    });
    return rooms;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRoomById = async (id: string) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        RoomAmenities: {
          include: {
            Amenities: true,
          },
        },
      },
    });
    return room;
  } catch (error) {
    console.log(error);
    return null;
  }
};

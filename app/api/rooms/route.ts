import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
        createdAt: "desc",
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, description, image, price, capacity, amenities } = body;

    if (!name || !description || !image || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const room = await prisma.room.create({
      data: {
        name,
        type: type || "deluxe",
        description,
        image,
        price: parseInt(price),
        capacity: parseInt(capacity) || 1,
        RoomAmenities: {
          create:
            amenities?.map((amenityId: string) => ({
              amenitiesId: amenityId,
            })) || [],
        },
      },
      include: {
        RoomAmenities: {
          include: {
            Amenities: true,
          },
        },
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 },
    );
  }
}

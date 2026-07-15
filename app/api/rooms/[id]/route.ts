import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Delete related RoomAmenities first
    await prisma.roomAmenities.deleteMany({
      where: { roomId: id },
    });

    // Delete the room
    await prisma.room.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, type, description, image, price, capacity, amenities } = body;

    if (!name || !description || !image || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Update room
    const room = await prisma.room.update({
      where: { id },
      data: {
        name,
        type: type || "deluxe",
        description,
        image,
        price: parseInt(price),
        capacity: parseInt(capacity) || 1,
      },
    });

    // If amenities provided, update them
    if (amenities) {
      // Delete existing amenities
      await prisma.roomAmenities.deleteMany({
        where: { roomId: id },
      });

      // Create new amenities
      if (amenities.length > 0) {
        await prisma.roomAmenities.createMany({
          data: amenities.map((amenityId: string) => ({
            roomId: id,
            amenitiesId: amenityId,
          })),
        });
      }
    }

    // Fetch updated room with amenities
    const updatedRoom = await prisma.room.findUnique({
      where: { id },
      include: {
        RoomAmenities: {
          include: {
            Amenities: true,
          },
        },
      },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 },
    );
  }
}

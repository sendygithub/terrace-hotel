import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { roomId, startDate, endDate, price } = body;

    if (!roomId || !startDate || !endDate || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if room exists
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check for date conflicts
    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        roomId,
        AND: [
          { startDate: { lt: new Date(endDate) } },
          { endDate: { gt: new Date(startDate) } },
        ],
      },
    });

    if (conflictingReservation) {
      return NextResponse.json(
        { error: "Room is not available for the selected dates" },
        { status: 409 },
      );
    }

    // Create reservation and payment
    const reservation = await prisma.reservation.create({
      data: {
        roomId,
        userId: session.user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price,
        payment: {
          create: {
            amount: price,
            status: "unpaid",
            method: "pending",
          },
        },
      },
      include: {
        Room: true,
        payment: true,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: {
        Room: true,
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 },
    );
  }
}

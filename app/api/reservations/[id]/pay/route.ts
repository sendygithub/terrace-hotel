import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { method } = body;

    if (!method) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 },
      );
    }

    // Find the reservation
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { payment: true },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    // Only allow the owner to pay
    if (reservation.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if already paid
    if (reservation.payment?.status === "paid") {
      return NextResponse.json({ error: "Already paid" }, { status: 400 });
    }

    // Update payment status to paid
    const payment = await prisma.payment.update({
      where: { reservationId: id },
      data: {
        status: "paid",
        method,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 },
    );
  }
}

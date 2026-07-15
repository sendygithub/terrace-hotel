import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  IoBedOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoCashOutline,
} from "react-icons/io5";

async function getDashboardStats() {
  const [totalRooms, totalReservations, totalUsers, totalRevenue] =
    await Promise.all([
      prisma.room.count(),
      prisma.reservation.count(),
      prisma.user.count(),
      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "paid",
        },
      }),
    ]);

  return {
    totalRooms,
    totalReservations,
    totalUsers,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const DashboardPage = async () => {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: IoBedOutline,
      color: "bg-blue-500",
      link: "/admin/rooms",
    },
    {
      title: "Total Reservations",
      value: stats.totalReservations,
      icon: IoCalendarOutline,
      color: "bg-green-500",
      link: "/admin/reservations",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: IoPeopleOutline,
      color: "bg-purple-500",
      link: "#",
    },
    {
      title: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: IoCashOutline,
      color: "bg-orange-500",
      link: "#",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to the admin dashboard. Manage your hotel here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-full`}>
                <card.icon className="size-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/room/create"
            className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow p-6 flex items-center gap-4"
          >
            <div className="bg-orange-100 p-3 rounded-full">
              <IoBedOutline className="size-6 text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Create New Room</p>
              <p className="text-sm text-gray-500">
                Add a new room to your hotel
              </p>
            </div>
          </Link>
          <Link
            href="/admin/rooms"
            className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow p-6 flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <IoBedOutline className="size-6 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Manage Rooms</p>
              <p className="text-sm text-gray-500">
                View and edit existing rooms
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

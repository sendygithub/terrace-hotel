"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navlink = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex flex-col md:flex-row md:items-center md:w-full">
      {/* Navigation Links - Centered */}
      <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:mt-0 md:border-0 md:bg-transparent md:flex-1 md:justify-center">
        <li>
          <Link
            href="/"
            className="block py-2 pl-3 pr-4 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/room"
            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
          >
            Room
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
          >
            Contact
          </Link>
        </li>
        {session && (
          <>
            <li>
              <Link
                href="/myreservation"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
              >
                My Reservation
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link
                    href="/admin/dashboard"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/room/create"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                  >
                    Create Room
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>

      {/* Login/Logout - Right side */}
      <div className="p-4 md:p-0 md:ml-auto">
        {session ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 truncate max-w-[100px]">
              {session.user?.email}
            </span>
            <Link
              href="/signin"
              onClick={async (e) => {
                e.preventDefault();
                const { signOut } = await import("next-auth/react");
                signOut();
              }}
              className="py-1.5 px-3 bg-red-500 text-white text-xs rounded-sm hover:bg-red-600"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            href="/signin"
            className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navlink;

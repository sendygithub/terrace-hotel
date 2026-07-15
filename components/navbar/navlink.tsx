"use client";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import clsx from "clsx";

const Navlink = () => {
  const [Open, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!Open)}
        className="inline-flex items-centre p-2 justify-centre  text-sm text-gray-500 rounde-md md:hidden hover:bg-gray-100"
      >
        {!Open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !Open,
        })}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounder-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:mt-0 md:border-0 md:bg-white">
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
          <>
            <li>
              <Link
                href="/myreservation"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
              >
                My Reservation
              </Link>
            </li>
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/room"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                >
                  Manage room
                </Link>
              </li>
            </>
          </>
          <li className="pt-2 md:pt-0"></li>
          <li className="pt-2 md:pt-0">
            <Link
              href="/signin"
              className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm"
            >
              login
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navlink;

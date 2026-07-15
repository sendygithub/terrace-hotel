"use client";

import Image from "next/image";
import Link from "next/link";
import Navlink from "@/components/navbar/navlink";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const [Open, setIsOpen] = useState(false);

  return (
    <nav className="container mx-auto flex items-center py-6">
      {/* Logo - Left */}
      <Link href="/">
        <Image
          src="/logo4.png"
          width={128}
          height={49}
          alt="Hotel Terrace Logo"
          priority
        />
      </Link>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!Open)}
        className="inline-flex items-centre p-2 justify-centre text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 ml-auto"
      >
        {!Open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      {/* Desktop Navigation - Hidden on mobile, shown on md+ */}
      <div
        className={clsx(
          "w-full md:flex md:items-center md:flex-1",
          {
            hidden: !Open,
            "absolute top-20 left-0 bg-white shadow-md z-50": Open,
          },
          "md:static md:shadow-none md:bg-transparent",
        )}
      >
        <Navlink />
      </div>
    </nav>
  );
};

export default Navbar;

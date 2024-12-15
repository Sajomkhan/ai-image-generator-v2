"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

const sidebarMenu = [
  {
    link: "/",
    menu: "Image Generator",
  },
  {
    link: "/upscale",
    menu: "Upscale",
  },
  {
    link: "/bgRemove",
    menu: "Bg Remove",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="bg-black text-white border-b">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14  items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            {/* LOGO */}
            <Link className="block text-teal-500 text-2xl font-bold" href="/">
              AI Image Generator
            </Link>
          </div>
          {/* NAV MANU FOR DESTOP */}
          <div className="flex items-center gap-4 md:gap-12">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {sidebarMenu.map((menu) => (
                  <li
                    className={`${
                      menu.link === pathname ? "border-b border-gray-500" : ""
                    } w-fit hover:border-gray-500 py-0.5`}
                    key={menu.menu}
                  >
                    <Link href={menu.link} className="">
                      {menu.menu}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* MOBILE MENU */}
            <div className="block md:hidden">
              {/* MOBILE MENU BUTTON */}
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <MdOutlineMenu size={24} />
              </button>
              {/* MOBILE MENU DROPDOWN */}
              <div
                className={`${
                  mobileMenu ? "block" : "hidden"
                } absolute top-0 right-0 z-10 w-72 rounded-lg border border-gray-100 bg-white shadow-lg`}
              >
                <div className="flex flex-col my-2 mx-2">
                  <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="self-end hover:bg-gray-300/50 p-2 mr-1"
                  >
                    <FaX />
                  </button>
                  <ul className="flex flex-col items-center text-lg">
                    {sidebarMenu.map((menu) => (
                      <li
                        className={`${
                          menu.link === pathname && "font-bold"
                        } w-full mb-7 text-center hover:font-bold`}
                        key={menu.menu}
                      >
                        <Link href={menu.link} className="">
                          {menu.menu}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

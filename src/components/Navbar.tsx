"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useAppContext } from "@/context";

const sidebarMenu = [
  {
    link: "/",
    menu: <FaHome size={20}/>,
  },
  {
    link: "/autoDownload",
    menu: "Auto Download",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const {resetState} = useAppContext()

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14  items-center justify-between">
          {/* NAV MANU FOR DESTOP */}
          <div className="flex items-center gap-4 md:gap-12">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {sidebarMenu.map((menu, index) => (
                  <li
                    className={`${
                      menu.link === pathname ? "border-b border-gray-500" : ""
                    } w-fit hover:border-gray-500 py-0.5`}
                    key={index}
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
                    {sidebarMenu.map((menu, index) => (
                      <li
                        className={`${
                          menu.link === pathname && "font-bold"
                        } w-full mb-7 text-center hover:font-bold`}
                        key={index}
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
          {/* Delete Storage */}
          <button className="bg-white text-red-600 rounded-lg px-2" onClick={resetState}>Reset Data Storage</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

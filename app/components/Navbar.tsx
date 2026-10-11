"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- NAV ITEMS (ROUTES) ---------------- */
  const navItems: NavItem[] = [
    { href: "/task1", label: "Task1" },
    { href: "/task2", label: "Task2" },
    { href: "/task3", label: "Task3" },
    { href: "/task4", label: "Task4" },
  ];

  /* ---------------- SCROLL SHADOW ---------------- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- ROUTE NAVIGATION ---------------- */
  const goToRoute = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-3 z-[99999] container rounded-2xl transition-all
      ${
        isScrolled
          ? "bg-[rgba(142,142,142,0.25)] backdrop-blur-md shadow-lg"
          : "bg-[rgba(142,142,142,0.25)] backdrop-blur-md"
      }`}
    >
      <nav className="relative flex items-center lg:px-6 lg:py-5 px-3 py-3">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" > 
         <Image
  src="/images/bblogo.webp"
  alt="Logo"
  width={180}
  height={60}
  priority
  className="h-auto w-auto"
/>

          </Link>
        </div>

        {/* DESKTOP NAV (TRUE CENTER) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-10">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => goToRoute(item.href)}
              className={`relative text-black font-medium transition-all
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-full after:bg-black
                after:transition-transform after:duration-300 cursor-pointer
                ${
                  pathname === item.href
                    ? "after:scale-x-100"
                    : "after:scale-x-0"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
      <button
  className="ml-auto lg:hidden text-black text-3xl font-bold"
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle menu"
>
  ☰
</button>

      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden text-black px-6 py-6 space-y-4 rounded-b-2xl">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => goToRoute(item.href)}
              className={`block text-lg w-full text-left ${
                pathname === item.href ? "underline" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

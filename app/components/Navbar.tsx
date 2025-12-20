"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("task1");

  /* ---------------- NAV ITEMS ---------------- */
  const navItems: NavItem[] = [
    { id: "task1", label: "Task1" },
    { id: "task2", label: "Task2" },
    { id: "task3", label: "Task3" },
    { id: "task45", label: "Task4&5" },
  ];

  /* ---------------- SCROLL SHADOW ---------------- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- SCROLL SPY (CORE LOGIC) ---------------- */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // section hits center
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ---------------- SCROLL TO SECTION ---------------- */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-3 z-[99999] container rounded-2xl transition-all
      ${isScrolled
        ? "bg-[rgba(142,142,142,0.25)] backdrop-blur-md shadow-lg"
        : "bg-[rgba(142,142,142,0.25)] backdrop-blur-md"
      }`}
    >
      <nav className="relative flex items-center lg:px-6 lg:py-5 px-3 py-3">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Image
            src="/images/bblogo.webp"
            alt="Logo"
            width={220}
            height={60}
            priority
          />
        </div>

        {/* DESKTOP NAV (TRUE CENTER) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-black font-medium transition-all
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-full after:bg-black
                after:transition-transform after:duration-300
                ${
                  activeSection === item.id
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
          className="ml-auto lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden  text-black px-6 py-6 space-y-4 rounded-b-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-lg w-full text-left ${
                activeSection === item.id ? "underline" : ""
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

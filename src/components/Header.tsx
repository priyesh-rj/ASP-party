"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";
import { Menu, X, Globe, UserCheck } from "lucide-react";

const Header: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const navItems = [
    { name: t("navHome"), href: "/" },
    { name: t("navAbout"), href: "/about" },
    { name: t("navCommittee"), href: "/committee" },
    { name: t("navContact"), href: "/contact" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue-700/95 text-white backdrop-blur shadow-md border-b border-brand-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Emblem / Blue Flag Avatar representation */}
              <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 bg-white rounded-full flex items-center justify-center border-2 border-brand-gold-500 shadow-inner group-hover:scale-105 transition-transform">
                <span className="text-brand-blue-700 font-bold text-lg sm:text-xl">ASP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-lg tracking-wide uppercase leading-tight text-white group-hover:text-brand-gold-400 transition-colors">
                  {t("heroTitle")}
                </span>
                <span className="text-[10px] sm:text-xs text-brand-gold-400 font-medium">
                  {language === "hi" ? "जिला - अम्बेडकर नगर (उ.प्र.)" : "Dist. Ambedkar Nagar (U.P.)"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm lg:text-base font-semibold transition-colors py-2 border-b-2 ${
                  isActive(item.href)
                    ? "text-brand-gold-400 border-brand-gold-400"
                    : "text-white/95 border-transparent hover:text-brand-gold-400 hover:border-brand-gold-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Join Us Button (Main CTA) */}
            <Link
              href="/join"
              className="flex items-center gap-1.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-800 font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-brand-gold-500/20 transform hover:-translate-y-0.5 transition-all text-sm lg:text-base"
            >
              <UserCheck size={18} />
              {t("navJoin")}
            </Link>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-brand-blue-800 hover:bg-brand-blue-600 text-white border border-brand-blue-500 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
              title={language === "en" ? "हिन्दी में बदलें" : "Switch to English"}
            >
              <Globe size={16} className="text-brand-gold-400 animate-pulse" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>
          </nav>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-brand-blue-800 text-white px-2 py-1 rounded text-xs font-bold border border-brand-blue-500"
            >
              <Globe size={14} className="text-brand-gold-400" />
              <span>{language === "en" ? "हिन्दी" : "Eng"}</span>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-gold-400 focus:outline-none p-1.5 rounded-md hover:bg-brand-blue-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-brand-blue-800 border-t border-brand-blue-600 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                  isActive(item.href)
                    ? "bg-brand-blue-700 text-brand-gold-400"
                    : "text-white hover:bg-brand-blue-700 hover:text-brand-gold-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Join Us Link in Menu */}
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-800 font-bold px-4 py-3 rounded-md shadow-md"
            >
              <UserCheck size={20} />
              {t("navJoin")}
            </Link>

            {/* Admin Panel Link in Menu */}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs text-white/60 hover:text-brand-gold-400 pt-3"
            >
              {t("navAdmin")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

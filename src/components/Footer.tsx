"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, ShieldAlert, ArrowUpRight } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-brand-gold-500">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Info and Slogan */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center border border-brand-gold-500">
                <span className="text-brand-blue-700 font-bold text-sm">ASP</span>
              </div>
              <span className="text-lg font-bold text-white tracking-wide uppercase">
                {t("heroTitle")}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <div className="text-xs text-slate-500 mt-2 font-mono">
              Designed for Ambedkar Nagar District (Uttar Pradesh)
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3 md:pl-8">
            <h3 className="text-white font-bold text-base border-b border-slate-800 pb-2 tracking-wide uppercase">
              {t("navAbout")} & Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1">
                  {t("navHome")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1">
                  {t("navAbout")}
                </Link>
              </li>
              <li>
                <Link href="/committee" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1">
                  {t("navCommittee")}
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1">
                  {t("navJoin")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1">
                  {t("navContact")}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1 text-slate-400">
                  <ShieldAlert size={14} className="text-brand-gold-400" />
                  {t("navAdmin")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base border-b border-slate-800 pb-2 tracking-wide uppercase">
              {t("contactPageTitle")}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-brand-gold-500 flex-shrink-0 mt-0.5" />
                <span>{t("officeAddressValue")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-brand-gold-500 flex-shrink-0" />
                <a href="tel:+919452000000" className="hover:text-brand-gold-400 transition-colors">
                  {t("officePhoneValue")}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-brand-gold-500 flex-shrink-0" />
                <a href="mailto:contact@aspambedkarnagar.org" className="hover:text-brand-gold-400 transition-colors">
                  {t("officeEmailValue")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Azad Samaj Party (Kanshi Ram) - District Ambedkar Nagar. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://aazadsamajpartyk.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold-400 transition-colors flex items-center gap-0.5"
            >
              ASP National Website <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Phone, Users, ShieldAlert, BadgeCheck } from "lucide-react";
import committeeData from "@/data/committee.json";

export default function CommitteePage() {
  const { t, language } = useTranslation();

  // Helper to generate initials for avatar
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Helper to assign a brand background pattern for avatar based on index
  const getAvatarBg = (id: string) => {
    const idx = parseInt(id) || 0;
    const gradients = [
      "from-brand-blue-700 to-brand-blue-500",
      "from-brand-blue-600 to-blue-500",
      "from-brand-blue-800 to-brand-blue-600",
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            {t("committeePageTitle")}
          </h1>
          <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">
            {t("committeePageSubtitle")}
          </p>
          <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Informative Note for User */}
        <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-2xl p-4 sm:px-6 flex items-start gap-3 max-w-2xl mx-auto">
          <ShieldAlert size={20} className="text-brand-blue-700 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-brand-blue-700 font-bold uppercase tracking-wider">
              {language === "hi" ? "व्यवस्थापक सूचना" : "Admin Instruction"}
            </span>
            <p className="text-xs sm:text-sm text-brand-blue-800 leading-relaxed">
              {t("committeeEditInfo")} {language === "hi" 
                ? "आप अपनी फ़ोटो को public/ directory में अपलोड करके image फ़ील्ड में उसका लिंक दे सकते हैं।" 
                : "You can upload your photos to the public/ directory and put the image path in the JSON file."}
            </p>
          </div>
        </div>

        {/* Committee Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {committeeData.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 flex flex-col items-center p-6 text-center hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Highlight badge for Jila Maha Mantri (User) */}
              {member.id === "2" && (
                <span className="absolute top-4 right-4 bg-brand-gold-500 text-brand-blue-800 text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <BadgeCheck size={14} />
                  {language === "hi" ? "आप (महासचिव)" : "You (G.Sec)"}
                </span>
              )}

              {/* Avatar Photo Frame */}
              <div className="relative h-28 w-28 rounded-full border-4 border-slate-100 group-hover:border-brand-gold-400 overflow-hidden shadow-inner flex items-center justify-center mb-5 transition-colors">
                {member.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={member.image}
                    alt={language === "hi" ? member.nameHi : member.nameEn}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  /* Symbolic Initials Avatar */
                  <div className={`h-full w-full bg-gradient-to-tr ${getAvatarBg(member.id)} flex items-center justify-center text-white font-extrabold text-2xl shadow-inner relative`}>
                    {getInitials(member.nameEn)}
                    {/* Overlay party logo text */}
                    <span className="absolute bottom-1.5 text-[9px] tracking-widest text-white/50 uppercase font-black">ASP</span>
                  </div>
                )}
              </div>

              {/* Leader Details */}
              <div className="flex flex-col gap-1 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {language === "hi" ? member.nameHi : member.nameEn}
                </h3>
                <span className="text-brand-blue-700 font-extrabold text-sm sm:text-base tracking-wide uppercase mt-1">
                  {language === "hi" ? member.roleHi : member.roleEn}
                </span>
                <span className="text-slate-400 text-xs sm:text-sm font-semibold mt-1">
                  {language === "hi" ? member.areaHi : member.areaEn}
                </span>
              </div>

              {/* Contact Button */}
              <a
                href={`tel:${member.phone}`}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-100 hover:bg-brand-blue-700 hover:text-white text-slate-700 font-semibold px-4 py-2.5 rounded-2xl transition-all text-sm group/btn"
              >
                <Phone size={16} className="text-brand-gold-500 group-hover/btn:text-brand-gold-400" />
                <span>{t("committeeContactBtn")}</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

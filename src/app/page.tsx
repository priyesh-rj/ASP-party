"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import { useTranslation } from "@/context/LanguageContext";
import { Scale, Users, Home, Award, Heart, CheckCircle2, ChevronRight, UserPlus } from "lucide-react";
import committeeData from "@/data/committee.json";

export default function HomePage() {
  const { t, language } = useTranslation();
  const [localMemberCount, setLocalMemberCount] = useState(1240); // Base mock count
  
  useEffect(() => {
    // Add real count from localStorage if any registrations occurred locally
    try {
      const savedMembers = localStorage.getItem("asp_registered_members");
      if (savedMembers) {
        const parsed = JSON.parse(savedMembers);
        if (Array.isArray(parsed)) {
          setLocalMemberCount(1240 + parsed.length);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const stats = [
    {
      id: 1,
      value: `${localMemberCount}+`,
      label: t("statsMembers"),
      icon: <Users className="text-brand-gold-500 h-7 w-7" />,
    },
    {
      id: 2,
      value: committeeData.length.toString(),
      label: t("statsCommittee"),
      icon: <Award className="text-brand-gold-500 h-7 w-7" />,
    },
    {
      id: 3,
      value: "250+",
      label: t("statsVillages"),
      icon: <Home className="text-brand-gold-500 h-7 w-7" />,
    },
    {
      id: 4,
      value: "5",
      label: t("statsSubdivisions"),
      icon: <CheckCircle2 className="text-brand-gold-500 h-7 w-7" />,
    },
  ];

  const coreValues = [
    {
      title: t("ideologyJusticeTitle"),
      desc: t("ideologyJusticeDesc"),
      icon: <Scale className="h-8 w-8 text-brand-blue-700" />,
    },
    {
      title: t("ideologyEqualityTitle"),
      desc: t("ideologyEqualityDesc"),
      icon: <Heart className="h-8 w-8 text-brand-blue-700" />,
    },
    {
      title: t("ideologyEmpowerTitle"),
      desc: t("ideologyEmpowerDesc"),
      icon: <Users className="h-8 w-8 text-brand-blue-700" />,
    },
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="p-3 bg-brand-blue-50 rounded-xl flex-shrink-0">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Messages Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            {language === "hi" ? "हमारा प्रेरणादायक नेतृत्व" : "Our Inspiring Leadership"}
          </h2>
          <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Chandra Shekhar Aazad */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8 sm:p-10 flex flex-col gap-6">
              {/* Leader Bio Header */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand-blue-700 flex items-center justify-center border-2 border-brand-gold-500 shadow-md flex-shrink-0">
                  {/* Portrait Placeholder Avatar */}
                  <span className="text-white font-extrabold text-2xl">CSA</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {t("leaderChandraShekharRole")}
                  </h3>
                  <span className="text-xs sm:text-sm text-brand-gold-600 font-bold uppercase tracking-wider block mt-0.5">
                    {language === "hi" ? "राष्ट्रीय अध्यक्ष - ए.एस.पी." : "National President - ASP"}
                  </span>
                </div>
              </div>
              
              {/* Leader Quote Message */}
              <blockquote className="relative">
                <span className="absolute -top-6 -left-3 text-7xl text-slate-100 font-serif leading-none select-none pointer-events-none">“</span>
                <p className="relative z-10 text-slate-600 italic leading-relaxed sm:text-lg">
                  {t("leaderChandraShekharMessage")}
                </p>
              </blockquote>
            </div>
            
            <div className="bg-brand-blue-700/5 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-brand-blue-700 font-bold text-sm">
              <span>{language === "hi" ? "संसद सदस्य (नगीना)" : "Member of Parliament (Nagina)"}</span>
              <span className="text-brand-gold-600">★ ★ ★</span>
            </div>
          </div>

          {/* Card 2: Joshi Ji (District General Secretary - the user) */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8 sm:p-10 flex flex-col gap-6">
              {/* Leader Bio Header */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand-blue-700 flex items-center justify-center border-2 border-brand-gold-500 shadow-md flex-shrink-0">
                  <span className="text-white font-extrabold text-2xl">JJ</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {t("leaderDistrictRole")}
                  </h3>
                  <span className="text-xs sm:text-sm text-brand-gold-600 font-bold uppercase tracking-wider block mt-0.5">
                    {language === "hi" ? "जिला कमेटी - अम्बेडकर नगर" : "District Committee - Ambedkar Nagar"}
                  </span>
                </div>
              </div>
              
              {/* Leader Quote Message */}
              <blockquote className="relative">
                <span className="absolute -top-6 -left-3 text-7xl text-slate-100 font-serif leading-none select-none pointer-events-none">“</span>
                <p className="relative z-10 text-slate-600 italic leading-relaxed sm:text-lg">
                  {t("leaderDistrictMessage")}
                </p>
              </blockquote>
            </div>
            
            <div className="bg-brand-blue-700/5 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-brand-blue-700 font-bold text-sm">
              <span>{language === "hi" ? "संगठन निर्माण एवं विस्तार" : "Organizational Setup & Outreach"}</span>
              <span className="text-brand-gold-600">★ ★ ★</span>
            </div>
          </div>

        </div>
      </section>

      {/* Core Principles Section */}
      <section className="bg-slate-100 py-16 sm:py-24 border-y border-slate-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
              {t("ideologyTitle")}
            </h2>
            <p className="text-slate-500 mt-3 sm:text-lg font-medium">
              {t("ideologySubtitle")}
            </p>
            <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/50 hover:shadow-lg transition-shadow flex flex-col gap-4 text-center items-center"
              >
                <div className="p-4 bg-brand-blue-50 rounded-2xl text-brand-blue-700 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Joining Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-brand-blue-700 to-brand-blue-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-brand-blue-600">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-gold-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-brand-blue-500/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-center lg:text-left flex flex-col gap-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {language === "hi" 
                  ? "क्या आप अम्बेडकर नगर में बदलाव की ताक़त बनना चाहते हैं?" 
                  : "Do you want to be a force of change in Ambedkar Nagar?"}
              </h2>
              <p className="text-slate-200 sm:text-lg max-w-2xl font-medium">
                {language === "hi"
                  ? "देर न करें, आज ही आज़ाद समाज पार्टी (कांशीराम) की प्राथमिक सदस्यता लें। ऑनलाइन पंजीकरण करें और अपनी सदस्यता पर्ची तुरंत प्राप्त करें।"
                  : "Don't delay. Join Azad Samaj Party (Kanshi Ram) as a primary member today. Register online and receive your membership slip instantly."}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link
                href="/join"
                className="flex items-center gap-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-800 font-black px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-brand-gold-500/30 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
              >
                <UserPlus size={22} />
                {t("heroCTA")}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import { UserCheck, Shield, ChevronRight, Award } from "lucide-react";

const HeroSection: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <div className="relative bg-brand-blue-800 overflow-hidden text-white min-h-[500px] flex items-center">
      {/* Background Abstract Decorative Shapes */}
      <div className="absolute inset-0 z-0 opacity-15">
        {/* A large blue/gold circle decoration */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-gold-500 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-blue-500 blur-3xl" />
        
        {/* Abstract lines pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Slogan and Text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 self-center lg:self-start bg-brand-blue-700 border border-brand-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-brand-gold-400 uppercase shadow-inner">
              <Award size={14} className="text-brand-gold-400 animate-bounce" />
              {language === "hi" ? "जिला इकाई - अम्बेडकर नगर" : "District Unit - Ambedkar Nagar"}
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-md">
              {language === "hi" ? (
                <>
                  <span className="text-brand-gold-400 block mb-1">समानता एवं सामाजिक न्याय</span>
                  <span>की ओर बढ़ते कदम</span>
                </>
              ) : (
                <>
                  <span className="text-brand-gold-400 block mb-1">Struggle for Equality</span>
                  <span>& Social Justice</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Link
                href="/join"
                className="flex items-center justify-center gap-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-800 font-extrabold px-8 py-4 rounded-full shadow-xl hover:shadow-brand-gold-500/20 transform hover:-translate-y-0.5 transition-all text-base sm:text-lg"
              >
                <UserCheck size={20} />
                {t("heroCTA")}
                <ChevronRight size={18} />
              </Link>
              <Link
                href="/committee"
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white px-8 py-4 rounded-full font-bold transition-all text-base sm:text-lg"
              >
                <Shield size={20} className="text-brand-gold-400" />
                {t("heroSecondaryCTA")}
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Visual Panel (Emblem and Slogans) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col items-center text-center gap-6 group hover:border-white/20 transition-all duration-300">
              
              {/* Symbolic Flag Ring */}
              <div className="relative h-32 w-32 rounded-full bg-gradient-to-tr from-brand-blue-700 to-brand-blue-500 flex items-center justify-center border-4 border-brand-gold-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-4xl tracking-tighter">ASP</span>
                {/* Shiny effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-brand-gold-400 tracking-wide uppercase">
                  {language === "hi" ? "जय भीम! जय भारत!" : "Jai Bhim! Jai Bharat!"}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xs mx-auto">
                  {language === "hi" 
                    ? "डॉ. भीमराव अम्बेडकर और मान्यवर कांशीराम साहब के सपनों को साकार करने के लिए समर्पित।" 
                    : "Dedicated to fulfilling the dreams of Dr. B.R. Ambedkar and Manyavar Kanshi Ram."}
                </p>
              </div>

              {/* Constitution representation card */}
              <div className="w-full bg-brand-blue-900/60 rounded-xl p-4 border border-brand-blue-700/50 text-left flex items-start gap-3">
                <div className="bg-brand-gold-500/20 p-2 rounded-lg text-brand-gold-400">
                  <Shield size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold-400">
                    {language === "hi" ? "संवैधानिक रक्षा" : "Constitutional Safeguard"}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {language === "hi" 
                      ? "भारतीय संविधान के मूल्यों, अधिकारों और सामाजिक समानता की रक्षा के लिए संकल्पित।" 
                      : "Committed to protecting the values, rights, and equality in the Indian Constitution."}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Wave bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-50" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
    </div>
  );
};

export default HeroSection;

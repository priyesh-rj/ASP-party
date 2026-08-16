"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Award, Compass, ShieldCheck, MapPin } from "lucide-react";

export default function AboutPage() {
  const { t, language } = useTranslation();

  const leaders = [
    {
      title: t("ambedkarTitle"),
      desc: t("ambedkarDesc"),
      initials: "BRA",
      color: "bg-brand-blue-700",
    },
    {
      title: t("kanshiRamTitle"),
      desc: t("kanshiRamDesc"),
      initials: "MKR",
      color: "bg-brand-blue-600",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            {t("aboutPageTitle")}
          </h1>
          <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">
            {t("aboutPageSubtitle")}
          </p>
          <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* History Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-blue-700 font-bold text-sm tracking-wide uppercase">
              <Compass size={18} className="text-brand-gold-500 animate-spin" style={{ animationDuration: "10s" }} />
              {language === "hi" ? "हमारा सफर एवं उद्देश्य" : "Our Journey & Mission"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {t("historyTitle")}
            </h2>
            <p className="text-slate-600 leading-relaxed sm:text-lg">
              {t("historyDesc")}
            </p>
          </div>
          
          <div className="lg:col-span-4 bg-brand-blue-50/50 border-2 border-brand-blue-100 rounded-2xl p-6 flex flex-col gap-4 items-center text-center">
            <div className="h-16 w-16 bg-brand-gold-500 text-brand-blue-800 rounded-full flex items-center justify-center font-black text-2xl shadow-md">
              15
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-lg">
                {language === "hi" ? "स्थापना दिवस" : "Foundation Day"}
              </h4>
              <p className="text-slate-500 text-sm mt-1">
                {language === "hi" ? "15 मार्च 2020 (मान्यवर कांशीराम साहब जयंती)" : "15 March 2020 (On Manyavar Kanshi Ram's Birth Anniversary)"}
              </p>
            </div>
          </div>
        </div>

        {/* Bahujan Idols Grid */}
        <div className="flex flex-col gap-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-tight text-center">
            {language === "hi" ? "हमारे आदर्श और पथ प्रदर्शक" : "Our Ideals & Guiding Icons"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 flex flex-col sm:flex-row gap-6 items-start hover:shadow-lg transition-shadow"
              >
                <div className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full ${leader.color} border-2 border-brand-gold-400 flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-md`}>
                  {leader.initials}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-slate-900">
                    {leader.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambedkar Nagar District Mission */}
        <div className="bg-gradient-to-tr from-brand-blue-800 to-brand-blue-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue-600">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-brand-gold-400 font-bold text-xs sm:text-sm tracking-wide uppercase">
                <MapPin size={18} className="text-brand-gold-400" />
                {language === "hi" ? "अम्बेडकर नगर जिला इकाई" : "Ambedkar Nagar District Unit"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {t("districtObjectiveTitle")}
              </h2>
              <p className="text-slate-200 leading-relaxed sm:text-lg">
                {t("districtObjectiveDesc")}
              </p>
            </div>
            
            <div className="lg:col-span-4 bg-white/10 rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
              <h4 className="font-bold text-brand-gold-400 text-sm uppercase tracking-wider">
                {language === "hi" ? "अन्तर्गत विधानसभाएं" : "Assembly Constituencies"}
              </h4>
              <ul className="text-sm font-semibold divide-y divide-white/10">
                <li className="py-2.5 flex justify-between items-center">
                  <span>1. {language === "hi" ? "अकबरपुर" : "Akbarpur"}</span>
                  <span className="text-xs px-2 py-0.5 bg-brand-gold-500 text-brand-blue-800 rounded font-bold">281</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span>2. {language === "hi" ? "टांडा" : "Tanda"}</span>
                  <span className="text-xs px-2 py-0.5 bg-brand-gold-500 text-brand-blue-800 rounded font-bold">278</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span>3. {language === "hi" ? "जलालपुर" : "Jalalpur"}</span>
                  <span className="text-xs px-2 py-0.5 bg-brand-gold-500 text-brand-blue-800 rounded font-bold">280</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span>4. {language === "hi" ? "कटेहरी" : "Katehari"}</span>
                  <span className="text-xs px-2 py-0.5 bg-brand-gold-500 text-brand-blue-800 rounded font-bold">277</span>
                </li>
                <li className="py-2.5 flex justify-between items-center">
                  <span>5. {language === "hi" ? "आलापुर (सुरक्षित)" : "Alapur (SC)"}</span>
                  <span className="text-xs px-2 py-0.5 bg-brand-gold-500 text-brand-blue-800 rounded font-bold">279</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

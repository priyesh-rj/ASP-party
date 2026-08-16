"use client";

import React, { useState, useRef } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { UserPlus, CheckCircle2, Download, Printer, ArrowLeft, BadgeInfo } from "lucide-react";

interface MemberFormData {
  name: string;
  fatherName: string;
  phone: string;
  whatsapp: string;
  age: string;
  gender: string;
  constituency: string;
  address: string;
  education: string;
  occupation: string;
}

export default function JoinPage() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState<MemberFormData>({
    name: "",
    fatherName: "",
    phone: "",
    whatsapp: "",
    age: "",
    gender: "Male",
    constituency: "",
    address: "",
    education: "",
    occupation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<{
    id: string;
    name: string;
    fatherName: string;
    phone: string;
    constituency: string;
    date: string;
  } | null>(null);

  const printAreaRef = useRef<HTMLDivElement>(null);

  const constituencies = [
    { value: "Akbarpur", label: language === "hi" ? "अकबरपुर (281)" : "Akbarpur (281)" },
    { value: "Tanda", label: language === "hi" ? "टांडा (278)" : "Tanda (278)" },
    { value: "Jalalpur", label: language === "hi" ? "जलालपुर (280)" : "Jalalpur (280)" },
    { value: "Katehari", label: language === "hi" ? "कटेहरी (277)" : "Katehari (277)" },
    { value: "Alapur", label: language === "hi" ? "आलापुर (सुरक्षित) (279)" : "Alapur (SC) (279)" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name || !formData.phone || !formData.constituency || !formData.address) {
      alert(language === "hi" ? "कृपया सभी अनिवार्य फ़ील्ड भरें!" : "Please fill in all mandatory fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Next.js server route
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const joinDate = new Date().toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const memberInfo = {
          id: result.memberId || `ASP-AN-${Math.floor(100000 + Math.random() * 900000)}`,
          name: formData.name,
          fatherName: formData.fatherName,
          phone: formData.phone,
          constituency: formData.constituency,
          date: joinDate,
        };

        setRegisteredMember(memberInfo);
        
        // Save to localStorage as redundancy
        const existingLocal = localStorage.getItem("asp_registered_members");
        let membersArray = [];
        if (existingLocal) {
          try {
            membersArray = JSON.parse(existingLocal);
          } catch (_) {}
        }
        membersArray.push(memberInfo);
        localStorage.setItem("asp_registered_members", JSON.stringify(membersArray));

        setSubmitSuccess(true);
      } else {
        throw new Error(result.message || "Failed submission");
      }
    } catch (error) {
      console.error(error);
      // Local fallback in case server route is not writable (e.g. build limits on some hosting)
      const joinDate = new Date().toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const generatedId = `ASP-AN-${Math.floor(100000 + Math.random() * 900000)}`;
      const memberInfo = {
        id: generatedId,
        name: formData.name,
        fatherName: formData.fatherName,
        phone: formData.phone,
        constituency: formData.constituency,
        date: joinDate,
      };

      setRegisteredMember(memberInfo);
      
      const existingLocal = localStorage.getItem("asp_registered_members");
      let membersArray = [];
      if (existingLocal) {
        try {
          membersArray = JSON.parse(existingLocal);
        } catch (_) {}
      }
      membersArray.push(memberInfo);
      localStorage.setItem("asp_registered_members", JSON.stringify(membersArray));
      
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setFormData({
      name: "",
      fatherName: "",
      phone: "",
      whatsapp: "",
      age: "",
      gender: "Male",
      constituency: "",
      address: "",
      education: "",
      occupation: "",
    });
    setSubmitSuccess(false);
    setRegisteredMember(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16 print:bg-white print:p-0">
      {/* Print Styles Override */}
      <style jsx global>{`
        @media print {
          header, footer, nav, button, .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
          .print-card-container {
            border: 2px solid #1e3a8a !important;
            padding: 24px !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!submitSuccess ? (
          /* REGISTRATION FORM VIEW */
          <div className="flex flex-col gap-10 no-print">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight flex items-center justify-center gap-2">
                <UserPlus className="text-brand-gold-500 h-8 w-8 sm:h-12 sm:w-12" />
                {t("joinTitle")}
              </h1>
              <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">
                {t("joinSubtitle")}
              </p>
              <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Note regarding Ambedkar Nagar */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-100 flex items-start gap-3 shadow-sm max-w-2xl mx-auto">
              <BadgeInfo size={20} className="text-brand-blue-700 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === "hi" 
                  ? "यह ऑनलाइन सदस्यता केवल अम्बेडकर नगर जिले (उत्तर प्रदेश) के निवासियों के लिए है। अपना सही विधानसभा क्षेत्र चुनें ताकि हम आपसे वार्ड स्तर पर संपर्क कर सकें।" 
                  : "This online membership is specifically for residents of Ambedkar Nagar District (Uttar Pradesh). Please select your exact Assembly Constituency."}
              </p>
            </div>

            {/* Form Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-150">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700">
                    {t("formName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={language === "hi" ? "उदा. राम प्रकाश गौतम" : "e.g. Ram Prakash Gautam"}
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Father's Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fatherName" className="text-sm font-bold text-slate-700">
                    {t("formFatherName")}
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder={language === "hi" ? "पिता या पति का नाम" : "Father's or Husband's name"}
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-bold text-slate-700">
                    {t("formPhone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    placeholder="9876XXXXXX"
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="whatsapp" className="text-sm font-bold text-slate-700">
                    {t("formWhatsapp")}
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    maxLength={10}
                    placeholder="9876XXXXXX"
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Age */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="age" className="text-sm font-bold text-slate-700">
                    {t("formAge")}
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min={18}
                    max={120}
                    placeholder="18"
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="gender" className="text-sm font-bold text-slate-700">
                    {t("formGender")}
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  >
                    <option value="Male">{t("formGenderMale")}</option>
                    <option value="Female">{t("formGenderFemale")}</option>
                    <option value="Other">{t("formGenderOther")}</option>
                  </select>
                </div>

                {/* Constituency Dropdown */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="constituency" className="text-sm font-bold text-slate-700">
                    {t("formConstituency")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="constituency"
                    name="constituency"
                    value={formData.constituency}
                    onChange={handleInputChange}
                    required
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50 text-slate-800 font-medium"
                  >
                    <option value="">-- {t("formSelectConstituency")} --</option>
                    {constituencies.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-bold text-slate-700">
                    {t("formAddress")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder={language === "hi" ? "गाँव/वार्ड का नाम, पोस्ट ऑफिस, तहसील" : "Village/Ward, Post office, Tehsil"}
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50 resize-none"
                  />
                </div>

                {/* Education */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="education" className="text-sm font-bold text-slate-700">
                    {t("formEducation")}
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="Graduate, 12th, Matric"
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Occupation */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="occupation" className="text-sm font-bold text-slate-700">
                    {t("formOccupation")}
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Farmer, Student, Business"
                    className="border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:shadow-brand-blue-700/20 transform hover:-translate-y-0.5 transition-all text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t("formSubmitting") : t("formSubmitBtn")}
                  </button>
                </div>

              </form>
            </div>
          </div>
        ) : (
          /* MEMBERSHIP SLIP / SLIP CONFIRMATION VIEW */
          <div className="flex flex-col items-center gap-10">
            {/* Success Heading */}
            <div className="text-center max-w-md no-print flex flex-col items-center gap-3">
              <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full shadow-inner animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {language === "hi" ? "सफलतापूर्वक पंजीकरण!" : "Registered Successfully!"}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {t("slipSuccessMsg")}
              </p>
            </div>

            {/* Membership Slip Card */}
            <div
              ref={printAreaRef}
              className="print-card-container w-full max-w-xl bg-gradient-to-tr from-brand-blue-850 to-brand-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-brand-gold-500 relative overflow-hidden flex flex-col gap-6"
              style={{ backgroundColor: "#1e3a8a" }}
            >
              {/* Card watermark background */}
              <div className="absolute inset-0 opacity-5 flex items-center justify-center select-none pointer-events-none">
                <span className="text-[120px] font-black tracking-tighter">ASP</span>
              </div>

              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-white/20 pb-4 relative z-10">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-2xl font-black tracking-wide uppercase text-brand-gold-400">
                    {t("slipTitle")}
                  </span>
                  <span className="text-xs text-slate-200 font-bold uppercase mt-0.5">
                    {t("slipSubtitle")}
                  </span>
                </div>
                {/* Mini emblem */}
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center border border-brand-gold-500 shadow-md">
                  <span className="text-brand-blue-700 font-black text-xs">ASP</span>
                </div>
              </div>

              {/* Confirmation Title Banner */}
              <div className="bg-brand-gold-500 text-brand-blue-900 font-black text-center py-1.5 px-4 rounded text-xs sm:text-sm tracking-widest uppercase shadow-md relative z-10">
                {t("slipHeader")}
              </div>

              {/* Member Data Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm sm:text-base border-b border-white/20 pb-6 relative z-10">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] sm:text-xs text-brand-gold-400 font-bold uppercase tracking-wider">
                    {t("formName")}
                  </span>
                  <span className="font-extrabold text-white">{registeredMember?.name}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] sm:text-xs text-brand-gold-400 font-bold uppercase tracking-wider">
                    {t("formFatherName")}
                  </span>
                  <span className="font-bold text-slate-200">{registeredMember?.fatherName || "-"}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] sm:text-xs text-brand-gold-400 font-bold uppercase tracking-wider">
                    {t("slipId")}
                  </span>
                  <span className="font-mono font-bold text-white tracking-wider">{registeredMember?.id}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] sm:text-xs text-brand-gold-400 font-bold uppercase tracking-wider">
                    {t("slipConstituency")}
                  </span>
                  <span className="font-bold text-white">
                    {constituencies.find((c) => c.value === registeredMember?.constituency)?.label || registeredMember?.constituency}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] sm:text-xs text-brand-gold-400 font-bold uppercase tracking-wider">
                    {t("formPhone")}
                  </span>
                  <span className="font-bold text-slate-200">{registeredMember?.phone}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] sm:text-xs text-brand-gold-400 font-bold uppercase tracking-wider">
                    {t("slipJoinedDate")}
                  </span>
                  <span className="font-bold text-slate-200">{registeredMember?.date}</span>
                </div>
              </div>

              {/* Card Footer Slogans */}
              <div className="flex justify-between items-center relative z-10">
                <span className="text-xs sm:text-sm font-black text-brand-gold-400 uppercase tracking-widest">
                  {language === "hi" ? "जय भीम! जय भारत!" : "JAI BHIM! JAI BHARAT!"}
                </span>
                {/* Jila Maha Mantri Signature stamp representation */}
                <div className="flex flex-col items-center">
                  <span className="text-[8px] sm:text-[10px] text-slate-300 italic">Auth Signatory</span>
                  <span className="text-xs sm:text-sm font-extrabold text-brand-gold-400">Joshi Ji (G.Sec)</span>
                </div>
              </div>
            </div>

            {/* Print and Close Actions */}
            <div className="flex flex-col sm:flex-row gap-4 no-print w-full max-w-md justify-center">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-800 font-extrabold px-6 py-3 rounded-full shadow-lg transform hover:-translate-y-0.5 transition-all w-full cursor-pointer"
              >
                <Printer size={18} />
                {t("slipDownloadBtn")}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-350 text-slate-700 font-bold px-6 py-3 rounded-full transition-all w-full cursor-pointer"
              >
                <ArrowLeft size={16} />
                {t("slipCloseBtn")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert(language === "hi" ? "कृपया नाम और संदेश भरें!" : "Please fill in Name and Message!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delivery
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            {t("contactPageTitle")}
          </h1>
          <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">
            {t("contactPageSubtitle")}
          </p>
          <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-brand-blue-50 text-brand-blue-700 rounded-2xl flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900">
                  {t("officeAddressTitle")}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t("officeAddressValue")}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-brand-blue-50 text-brand-blue-700 rounded-2xl flex-shrink-0">
                <Phone size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900">
                  {t("officePhone")}
                </h3>
                <a href="tel:+919452000000" className="text-sm text-slate-500 hover:text-brand-blue-700 font-medium transition-colors">
                  {t("officePhoneValue")}
                </a>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                  {language === "hi" ? "सुबह 10:00 से शाम 6:00" : "10:00 AM to 6:00 PM"}
                </span>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-brand-blue-50 text-brand-blue-700 rounded-2xl flex-shrink-0">
                <Mail size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-900">
                  {t("officeEmail")}
                </h3>
                <a href="mailto:contact@aspambedkarnagar.org" className="text-sm text-slate-500 hover:text-brand-blue-700 font-medium transition-colors">
                  {t("officeEmailValue")}
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 flex flex-col justify-center">
            
            {success ? (
              <div className="flex flex-col items-center gap-4 text-center py-6">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full shadow-inner animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {language === "hi" ? "संदेश भेज दिया गया!" : "Message Sent!"}
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  {t("contactSuccess")}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-2 rounded-full transition-colors text-sm"
                >
                  {language === "hi" ? "एक और संदेश भेजें" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {t("contactFormHeader")}
                </h2>
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700">
                    {language === "hi" ? "आपका नाम" : "Your Name"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={language === "hi" ? "अपना नाम दर्ज करें" : "Enter your name"}
                    className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700">
                    {t("contactEmail")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-bold text-slate-700">
                    {t("contactMessage")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={language === "hi" ? "अपना संदेश यहाँ लिखें..." : "Type your message here..."}
                    className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-brand-blue-700/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <Send size={16} />
                  {isSubmitting 
                    ? (language === "hi" ? "भेजा जा रहा है..." : "Sending...") 
                    : t("contactSubmitBtn")}
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Maps Mockup Frame */}
        <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-100 overflow-hidden w-full h-[350px]">
          {/* Embedding standard OpenStreetMap or Google Maps for Akbarpur, Ambedkar Nagar */}
          <iframe
            title="ASP Ambedkar Nagar District Office Map Location"
            src="https://maps.google.com/maps?q=Akbarpur,%20Ambedkar%20Nagar,%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
}

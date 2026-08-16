"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { LogIn, ShieldAlert, Users, Search, Download, LogOut, Eye, X, Filter } from "lucide-react";

interface Member {
  id: string;
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
  joinedDate: string;
}

export default function AdminPage() {
  const { t, language } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [constituencyFilter, setConstituencyFilter] = useState("");
  
  // Modal State
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Default hardcoded password
  const ADMIN_PASSWORD = "Admin@ASP2026";

  useEffect(() => {
    // Check if session token exists
    const sessionAuth = sessionStorage.getItem("asp_admin_session");
    if (sessionAuth === "true") {
      setIsLoggedIn(true);
      fetchMembers();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
      sessionStorage.setItem("asp_admin_session", "true");
      fetchMembers();
    } else {
      setLoginError(t("adminIncorrectPassword"));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    sessionStorage.removeItem("asp_admin_session");
  };

  const fetchMembers = async () => {
    setIsLoading(true);
    let allMembers: Member[] = [];
    try {
      const response = await fetch("/api/members");
      if (response.ok) {
        const data = await response.json();
        allMembers = data.members || [];
      }
    } catch (err) {
      console.warn("API route not available (Static site deployment). Using browser storage.");
    }

    // Load and append members from localStorage
    try {
      const localMembers = localStorage.getItem("asp_registered_members");
      if (localMembers) {
        const parsed = JSON.parse(localMembers);
        if (Array.isArray(parsed)) {
          parsed.forEach((pm: any) => {
            if (!allMembers.some((m) => m.id === pm.id)) {
              allMembers.push({
                ...pm,
                whatsapp: pm.whatsapp || "",
                age: pm.age || "",
                gender: pm.gender || "",
                address: pm.address || "",
                education: pm.education || "",
                occupation: pm.occupation || "",
                joinedDate: pm.joinedDate || new Date().toISOString(),
              });
            }
          });
        }
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }

    setMembers(allMembers);
    setIsLoading(false);
  };

  // Filtered members list
  const filteredMembers = members.filter((member) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(query) ||
      member.phone.includes(query) ||
      member.id.toLowerCase().includes(query) ||
      member.address.toLowerCase().includes(query);

    const matchesConstituency =
      constituencyFilter === "" || member.constituency === constituencyFilter;

    return matchesSearch && matchesConstituency;
  });

  // Calculate statistics
  const statsByConstituency = {
    Akbarpur: members.filter((m) => m.constituency === "Akbarpur").length,
    Tanda: members.filter((m) => m.constituency === "Tanda").length,
    Jalalpur: members.filter((m) => m.constituency === "Jalalpur").length,
    Katehari: members.filter((m) => m.constituency === "Katehari").length,
    Alapur: members.filter((m) => m.constituency === "Alapur").length,
  };

  const handleExportCSV = () => {
    const headers = [
      "S.No.",
      "Membership ID",
      "Name",
      "Father's Name",
      "Phone",
      "WhatsApp",
      "Age",
      "Gender",
      "Constituency",
      "Address",
      "Education",
      "Occupation",
      "Date Joined",
    ];

    const rows = filteredMembers.map((m, idx) => [
      idx + 1,
      m.id,
      m.name,
      m.fatherName,
      m.phone,
      m.whatsapp || "",
      m.age || "",
      m.gender || "",
      m.constituency,
      m.address.replace(/"/g, '""'), // Escape quotes in address
      m.education || "",
      m.occupation || "",
      m.joinedDate ? new Date(m.joinedDate).toLocaleString() : "",
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.map((val) => `"${val}"`).join(","))
      .join("\n");

    // Add UTF-8 BOM for MS Excel to display Hindi text correctly
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `ASP_AmbedkarNagar_Members_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {!isLoggedIn ? (
        /* ADMIN LOGIN VIEW */
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mt-12 flex flex-col gap-6 items-center text-center">
          
          <div className="h-16 w-16 bg-brand-blue-50 rounded-full flex items-center justify-center text-brand-blue-700">
            <ShieldAlert size={32} />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-slate-900 uppercase">
              {t("adminLoginTitle")}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">
              Ambedkar Nagar District Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col text-left gap-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t("adminPasswordPlaceholder")}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-slate-350 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50 font-mono text-center tracking-widest text-lg"
              />
            </div>

            {loginError && (
              <span className="text-red-500 text-xs font-bold mt-1 block">
                {loginError}
              </span>
            )}

            <button
              type="submit"
              className="w-full bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <LogIn size={18} />
              {t("adminLoginBtn")}
            </button>
          </form>

          {/* Prompt Tip */}
          <div className="text-[10px] sm:text-xs text-slate-400 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            Default setup credentials password is <code className="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">Admin@ASP2026</code>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD PANELS VIEW */
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Header Panel */}
          <div className="bg-brand-blue-750 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-brand-blue-600" style={{ backgroundColor: "#1e3a8a" }}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center border border-brand-gold-500">
                <span className="text-brand-blue-700 font-black text-sm">ASP</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
                  {t("adminPageTitle")}
                </h1>
                <p className="text-slate-200 text-xs sm:text-sm font-semibold">
                  {t("adminPageSubtitle")}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-brand-blue-900/60 hover:bg-red-600 border border-white/20 hover:border-red-600 text-white font-bold px-4 py-2 rounded-xl transition-all text-sm cursor-pointer"
            >
              <LogOut size={16} />
              {t("adminLogout")}
            </button>
          </div>

          {/* Quick Stats constituency panels */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {/* Total count Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/50 flex flex-col justify-center items-center text-center col-span-2 md:col-span-1 bg-brand-blue-50/20">
              <span className="text-3xl font-black text-brand-blue-700 leading-tight">
                {members.length}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                {t("adminTotalMembers")}
              </span>
            </div>

            {/* Constituencies counts cards */}
            {[
              { key: "Akbarpur", label: language === "hi" ? "अकबरपुर" : "Akbarpur" },
              { key: "Tanda", label: language === "hi" ? "टांडा" : "Tanda" },
              { key: "Jalalpur", label: language === "hi" ? "जलालपुर" : "Jalalpur" },
              { key: "Katehari", label: language === "hi" ? "कटेहरी" : "Katehari" },
              { key: "Alapur", label: language === "hi" ? "आलापुर" : "Alapur" },
            ].map((c) => (
              <div key={c.key} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/50 flex flex-col justify-center items-center text-center">
                <span className="text-2xl font-black text-slate-800 leading-tight">
                  {statsByConstituency[c.key as keyof typeof statsByConstituency]}
                </span>
                <span className="text-xs text-slate-400 font-semibold mt-1">
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          {/* Search, Filter, and Export Tools */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder={t("adminSearchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-slate-250 rounded-2xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50 text-slate-700 font-medium"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* Constituency Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="text-slate-400 h-4 w-4 flex-shrink-0" />
                <select
                  value={constituencyFilter}
                  onChange={(e) => setConstituencyFilter(e.target.value)}
                  className="border border-slate-250 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-slate-50 text-slate-700 font-semibold w-full sm:w-auto"
                >
                  <option value="">{t("adminAllConstituencies")}</option>
                  <option value="Akbarpur">{language === "hi" ? "अकबरपुर" : "Akbarpur"}</option>
                  <option value="Tanda">{language === "hi" ? "टांडा" : "Tanda"}</option>
                  <option value="Jalalpur">{language === "hi" ? "जलालपुर" : "Jalalpur"}</option>
                  <option value="Katehari">{language === "hi" ? "कटेहरी" : "Katehari"}</option>
                  <option value="Alapur">{language === "hi" ? "आलापुर" : "Alapur"}</option>
                </select>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCSV}
                disabled={filteredMembers.length === 0}
                className="flex items-center justify-center gap-1.5 bg-brand-gold-500 hover:bg-brand-gold-600 disabled:bg-slate-200 disabled:text-slate-400 text-brand-blue-800 font-bold px-6 py-2.5 rounded-2xl shadow transition-all text-sm w-full sm:w-auto cursor-pointer"
              >
                <Download size={16} />
                {t("adminExportCSV")}
              </button>
            </div>

          </div>

          {/* Members Table */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-6 py-4">{t("adminTableNo")}</th>
                    <th className="px-6 py-4">{t("adminTableName")}</th>
                    <th className="px-6 py-4">{t("adminTableConstituency")}</th>
                    <th className="px-6 py-4">{t("adminTablePhone")}</th>
                    <th className="px-6 py-4">{t("adminTableAddress")}</th>
                    <th className="px-6 py-4">{language === "hi" ? "पंजीकरण विवरण" : "Details"}</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-250 text-sm text-slate-600">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 font-bold text-slate-400">
                        {language === "hi" ? "डाटा लोड हो रहा है..." : "Loading registrations data..."}
                      </td>
                    </tr>
                  ) : filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 font-bold text-slate-400">
                        {t("adminNoRecords")}
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member, idx) => (
                      <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">{member.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono mt-0.5">{member.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-brand-blue-50 text-brand-blue-750 font-bold text-xs rounded-full uppercase">
                            {member.constituency}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-semibold">{member.phone}</td>
                        <td className="px-6 py-4 max-w-xs truncate text-slate-500" title={member.address}>
                          {member.address}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedMember(member)}
                            className="flex items-center gap-1 text-xs text-brand-blue-700 hover:text-brand-blue-800 font-bold bg-brand-blue-50 hover:bg-brand-blue-100/50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye size={12} />
                            <span>{language === "hi" ? "देखें" : "View"}</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Member Details Modal */}
          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-zoomIn flex flex-col">
                
                {/* Modal Header */}
                <div className="bg-brand-blue-750 text-white p-5 flex items-center justify-between" style={{ backgroundColor: "#1e3a8a" }}>
                  <div className="flex flex-col">
                    <span className="font-extrabold uppercase text-xs tracking-wider text-brand-gold-400">Member Profile Info</span>
                    <span className="font-extrabold text-lg sm:text-xl leading-none mt-1">{selectedMember.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-white/60 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-slate-600">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Membership ID</span>
                    <span className="font-mono font-bold text-slate-800">{selectedMember.id}</span>
                  </div>
                  
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date Joined</span>
                    <span className="font-bold text-slate-800">
                      {selectedMember.joinedDate ? new Date(selectedMember.joinedDate).toLocaleDateString() : ""}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formFatherName")}</span>
                    <span className="font-bold text-slate-800">{selectedMember.fatherName || "-"}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formConstituency")}</span>
                    <span className="font-bold text-brand-blue-700 uppercase">{selectedMember.constituency}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formPhone")}</span>
                    <span className="font-mono font-bold text-slate-800">{selectedMember.phone}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formWhatsapp")}</span>
                    <span className="font-mono font-bold text-slate-800">{selectedMember.whatsapp || "-"}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formAge")} / {t("formGender")}</span>
                    <span className="font-bold text-slate-800">{selectedMember.age || "-"} / {selectedMember.gender || "-"}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formEducation")} / {t("formOccupation")}</span>
                    <span className="font-bold text-slate-800">{selectedMember.education || "-"} / {selectedMember.occupation || "-"}</span>
                  </div>

                  <div className="flex flex-col gap-0.5 col-span-2 border-t border-slate-100 pt-3 mt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("formAddress")}</span>
                    <span className="font-bold text-slate-800 leading-relaxed">{selectedMember.address}</span>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-slate-50 px-6 py-4 flex justify-end border-t border-slate-150">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-5 py-2 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Close Profile
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

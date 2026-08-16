import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aazad Samaj Party (Kanshi Ram) | District Ambedkar Nagar",
  description: "Official Website of Aazad Samaj Party (Kanshi Ram) - District Ambedkar Nagar, Uttar Pradesh. Join the Bahujan movement for social justice, equality, and dignity.",
  keywords: "Azad Samaj Party, ASP Kanshi Ram, Ambedkar Nagar, Chandra Shekhar Aazad, Akbarpur, Tanda, Jalalpur, Katehari, Alapur, Bahujan movement, Join ASP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

# Azad Samaj Party (Kanshi Ram) - Ambedkar Nagar District Website

A premium, bilingual (Hindi & English), responsive website built using the latest Next.js 15 (App Router), TypeScript, and Tailwind CSS. It is designed specifically for the Azad Samaj Party (Kanshi Ram) organization in the Ambedkar Nagar district, Uttar Pradesh.

## Features

- 🌐 **Bilingual Support**: Toggle between English and Hindi (Devnagari script) instantly.
- 👥 **Online Membership Form**: Locals can register by filling in a validation-enabled form, selecting their assembly constituency (Akbarpur, Tanda, Jalalpur, Katehari, Alapur), and entering address/occupation details.
- 🪪 **Printable Membership Slip**: On successful registration, users receive a beautiful, print-ready membership card featuring automated membership numbers and G.Sec authorized signature stamps.
- 🏛️ **Executive Committee Roster**: Displays local committee members and assembly coordinators in an easily editable card layout configuration.
- 📊 **Security-Protected Admin Panel**: A dashboard under `/admin` accessible with password `Admin@ASP2026` to manage members, filter registrations by Vidhansabha, and view complete details.
- 📥 **BOM UTF-8 CSV Export**: Admins can export registrations to Excel-compatible CSVs with full support for Hindi characters.
- 🗺️ **Active District Mapping**: Active location integration targeting Akbarpur, Ambedkar Nagar.

---

## Direct Link Deployment (Get Your Live Website Link)

Because this website uses dynamic API endpoints (such as registering members), it requires a server runtime. The easiest way to host this website for **FREE** and get a direct live link is through **Vercel** (the official Next.js deployment platform):

### 1-Click Deploy Instructions:

1. Push this project to your GitHub repository.
2. Click the button below to import and deploy it to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

*(Make sure to replace `your-username/your-repo-name` with your actual GitHub username and repository name inside this README.md file).*

---

## Local Development Setup

To run the website on your local machine:

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

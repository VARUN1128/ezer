# Ezer — Second-Hand Product Verification Platform
**Tagline:** *Know Before You Buy.*

Ezer is an Indian second-hand product verification platform designed to eliminate the risks of buying pre-owned goods on external marketplaces such as **OLX**, **Facebook Marketplace**, **Quikr**, and **Truecaller Buy & Sell**.

Instead of selling products directly, Ezer provides a trusted, neutral physical verification layer. Customers submit an external listing URL or details, and nearby verified expert partners (hardware specialists, automobile mechanics, electronics engineers) travel on-site to inspect the item, check hardware integrity, test serial authenticity, verify ownership, and deliver an impartial inspection report before any money changes hands.

---

## 🚀 Key Features

### 1. Customer Experience
- **Hero & Listing Submission:**
  - Paste any OLX, Facebook Marketplace, Quikr or classifieds link.
  - Three submission modes: **Paste Listing Link**, **Add Details Manually**, and **Upload Photos**.
  - **Important UI Behavior:** Upon clicking *Analyze Listing*, the input field clears completely back to blank, and a high-visibility confirmation banner appears with a direct link to the request in the customer dashboard.
- **Marketplace Discovery (`/marketplace`):**
  - Explore simulated Indian second-hand listings across Mobiles, Laptops, Cars, Bikes, Electronics, Home Appliances, and Furniture.
  - Filters by category, price ranges (₹), and marketplace source.
  - One-click **Request Inspection** button that opens a pre-filled submission modal.
  - Clear demo badges and disclaimers stating that mock data is for demonstration only.
- **Customer Dashboard (`/dashboard`):**
  - Track requests by status: *Pending Partner*, *Partner Assigned*, *In Progress*, *Completed Inspections*, and *Inspection Reports*.
  - Full inspection detail viewer showing:
    - Condition rating (1 to 10 score)
    - Authenticity status (*100% Genuine OEM*, *Refurbished*, *Tampered*, *Counterfeit*)
    - Ezer Fair Valuation vs. seller ask price
    - Component-by-component inspection checklist (e.g. Battery health, True Tone, frame rust, paint gauge)
    - Inspector notes and final recommendation (*Recommend: Safe to Buy*, *Negotiate Lower Price*, *Do Not Buy: High Risk*)

### 2. Inspector / Partner Portal (`/inspector`)
- **Dashboard Overview:** Live stats on available requests, accepted active jobs, completed jobs, and weekly earnings.
- **Available Jobs:**
  - View real-time inspection requests from customers in the partner's district (e.g. Bengaluru Urban, Mumbai Suburban, Delhi NCR).
  - Shows product category, title, requested location, district, timestamp, inspection fee payout (₹499 to ₹999), and customer instructions.
  - **Atomic Accept Job:** Assigns the job to the partner, updates status to `accepted`, and removes the job from all other inspectors.
  - **Decline Job:** Records the partner's decline in `partner_job_responses` and removes it from their list without cancelling it globally for other eligible partners.
- **My Jobs:**
  - Track assigned jobs and click **Submit Inspection Report** to open the interactive report filing modal.
  - The inspector grades the condition (1-10), selects authenticity status, calculates fair market valuation, logs component checks, enters written findings, and publishes the report.
- **Earnings & Payouts:** Tracks lifetime earnings, pending clearances, and weekly UPI transfers (`vikram.m@oksbi`).
- **Profile:** Shows verified partner badge, rating (4.9★), coverage district, and skill endorsements.

### 3. Join as an Expert Partner (`/join-partner`)
- Accessible from main navigation ("For Inspectors"), footer, and mobile nav.
- Structured registration form:
  - Full Name (required)
  - Indian Mobile Number with 10-digit validation (required)
  - Location / City & District selector (required)
  - Optional Email, Experience, Tools owned, and multi-select Areas of Expertise.
- Duplicate detection: Prevents multiple registrations with the same mobile number.
- Applications are submitted with status `pending`. Partners do not receive automatic portal access until reviewed by operations.

### 4. Mobile-First Optimization
- **Desktop:** Full top navigation, rich multi-column layouts, spacious cards, and modal dialogs.
- **Mobile:**
  - Compact top header with brand logo.
  - Fixed bottom navigation bar with role-aware tabs:
    - *Customer mode:* Home, Explore, Requests, Profile.
    - *Inspector mode:* Dashboard, Jobs, My Jobs, Profile.
  - Touch-friendly buttons, responsive modals, and zero horizontal scroll overflow.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS with custom luxury dark theme (`#101010` background, `#1C1B19` surface, `#F5C45E` / `#D99C32` gold accents)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, RPC atomic functions)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti

---

## 📁 Project Architecture

```
d:\Ezer-shalom\
├── src\
│   ├── app\
│   │   ├── globals.css              # Dark luxury theme, gold glows & scrollbars
│   │   ├── layout.tsx               # Root layout, Navbar, Footer, MobileBottomNav
│   │   ├── page.tsx                 # Home page (Hero, URL submission form, highlights)
│   │   ├── marketplace\page.tsx     # Demo product discovery & search
│   │   ├── dashboard\page.tsx       # Customer inspection dashboard
│   │   ├── inspector\page.tsx       # Inspector / partner portal & job board
│   │   ├── join-partner\page.tsx    # Become an Ezer Expert Partner registration
│   │   ├── login\page.tsx           # Supabase Auth + 1-Click Demo Persona Switcher
│   │   ├── how-it-works\page.tsx    # Category verification protocols & checklist
│   │   └── about\page.tsx           # Mission & trust philosophy
│   ├── components\
│   │   ├── EzerLogo.tsx             # Consistent brand monogram logo
│   │   ├── Navbar.tsx               # Responsive header & customer/inspector switch
│   │   ├── MobileBottomNav.tsx      # Fixed bottom nav for mobile devices
│   │   ├── Footer.tsx               # Brand footer with legal disclaimers
│   │   ├── SubmitListingModal.tsx   # Manual submission & photo upload modal
│   │   ├── InspectionReportModal.tsx# Verified inspection report viewer
│   │   └── PartnerSubmitReportModal.tsx # Inspector report filing modal
│   └── lib\
│       ├── constants.ts             # Categories, Indian districts, sample products
│       ├── types.ts                 # Full TypeScript definitions for all entities
│       ├── store.ts                 # Hybrid store (Supabase + reactive local fallback)
│       └── supabase\
│           └── client.ts            # Supabase JS client initializer & config check
├── supabase\
│   ├── migrations\
│   │   └── 20261112_init_ezer.sql   # Complete PostgreSQL schema, tables, RLS & RPC
│   └── seed.sql                     # Realistic Indian demo seed data
├── .env.example                     # Required environment variable templates
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Supabase Database Schema

The database schema is defined in `supabase/migrations/20261112_init_ezer.sql`:

1. **`profiles`**: User profiles with roles (`customer`, `partner`, `admin`).
2. **`partner_applications`**: Inspector applications with Indian phone uniqueness check and `pending` initial status.
3. **`partner_profiles`**: Approved inspector profiles with district coverage, rating, and verification state.
4. **`inspection_requests`**: Customer listing submissions with listing URL, category, location, district, fee, and status (`pending`, `accepted`, `in_progress`, `completed`, `declined`).
5. **`partner_job_responses`**: Records partner decisions (`accepted`, `declined`) per request.
6. **`inspection_reports`**: Detailed condition score, authenticity verdict, fair valuation, component issues list, and recommendation.
7. **Atomic Function `accept_inspection_job`**:
   - Executes an atomic `UPDATE ... WHERE status = 'pending'` to guarantee that race conditions are impossible if two inspectors attempt to accept the same job simultaneously.

---

## ⚙️ Setup & Running Locally

### 1. Clone & Install Dependencies
```bash
cd d:\Ezer-shalom
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If you run without Supabase credentials, the app operates in resilient Demo Mode with full local reactivity and simulated database operations).*

### 3. Run Database Migrations in Supabase
Run the SQL script located in `supabase/migrations/20261112_init_ezer.sql` in your Supabase SQL Editor.
To populate sample data, run `supabase/seed.sql`.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

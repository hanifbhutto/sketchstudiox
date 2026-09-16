# Sketch Studio X — Fine Art Atelier & Bespoke Governance System

An enterprise-grade, high-end fine art atelier web application built for creating bespoke hand-drawn portraits, managing secure client checkouts via PayPal, and maintaining dynamic studio governance via a centralized admin dashboard.

---

## 🛠️ Technology Stack & Platforms (A to Z)

- **Frontend & UI**: Next.js (App Router), React, Tailwind CSS, Framer Motion (for staggered entrance animations and smooth immersive transitions).
- **Icons & UI Assets**: Lucide React.
- **Database & Backend**: Supabase (PostgreSQL relational database managed securely via Prisma ORM).
- **Database Safety & Automation**: Supabase `pg_cron` extension configured to prevent free-tier database auto-pausing.
- **Media Management**: Cloudinary (Centralized Media Vault repository for studio branding seals, logos, and artwork assets with secure upload/deletion pipelines).
- **Payment Gateway**: PayPal Smart Buttons API (Supporting Sandbox & Live Production settlement modes with dynamic currency switching).
- **Deployment & Hosting**: Vercel (Production Cloud Hosting).

---

## 🏛️ System Architecture & Core Features

1. **Atelier Governance & Admin Panel (`/admin`)**:
   - Manages UK Companies House legal identity and registration numbers.
   - Dynamic control over PayPal gateway credentials, environment switcher (Sandbox/Production), and active status toggles.
   - Proprietor details (`proprietorName`, `proprietorEmail`, `proprietorPhone`, `proprietorAddress`) reflecting in real-time across the platform footer.
   - Production fulfillment lead times and custom commission easel status toggles.

2. **Centralized Media Vault**:
   - Modal-driven asset picker integrated seamlessly with Cloudinary for managing brand logos and portfolio items.

3. **Immersive Public Frontend**:
   - Gallery exhibitions, human portraits, pet and animal core studies.
   - Bespoke commission workflow with dynamic pricing matrices.
   - Live status pulse indicating active/paused atelier commission queues.

---

## ⚙️ Environment Configuration (`.env`)

Create a `.env` file in the root directory of your project and paste the following production configuration:

```env
# ==========================================
# SUPABASE & PRISMA DATABASE CONFIGURATION
# ==========================================
DATABASE_URL="postgresql://postgres.slxrezehjhjnkchixktw:sketchstudio12345%40@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
DIRECT_URL="postgresql://postgres.slxrezehjhjnkchixktw:supabase:@[aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require](https://aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require)"

# ==========================================
# ADMIN AUTHENTICATION & SECURITY
# ==========================================
ADMIN_EMAIL="admin@sketchstudiox.com"
ADMIN_PASSWORD="StudioAdmin2026Secure!"
ADMIN_JWT_SECRET="super-secret-studio-key-987654321"

# ==========================================
# CLOUDINARY MEDIA VAULT INTEGRATION
# ==========================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="oeullaft"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="sketchstudio_preset"
CLOUDINARY_API_KEY="289636527764821"
CLOUDINARY_API_SECRET="iYY3FFM1HzWYQF7kcuRY2d8FrQA"
🚀 Local Development Setup
Clone the repository:

Bash
git clone [https://github.com/your-username/sketchstudiox.git](https://github.com/your-username/sketchstudiox.git)
cd sketchstudiox
Install dependencies:

Bash
npm install
Synchronize Prisma Schema & Generate Client:

Bash
npx prisma db push
npx prisma generate
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

🛡️ Database Persistence & Keep-Alive Protection
To prevent Supabase free-tier PostgreSQL databases from automatically pausing after 7 days of inactivity, the system utilizes an active internal pg_cron heartbeat query scheduled inside the Supabase SQL editor:

SQL
create extension if not exists pg_cron;

select cron.schedule(
  'keep-alive-job',
  '0 0 */3 * *', 
  $$ select count(*) from "StudioSettings"; $$
);
📄 License & Ownership
Copyright © 2026 Sketch X Studio Ltd. All rights reserved. Registered in England and Wales (UK). Company No: 17429707.
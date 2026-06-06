# LearnLMS

Platform LMS (Learning Management System) berbasis Next.js 16 dengan autentikasi, proteksi keamanan, dan landing page modern.

## Getting Started

Jalankan development server:

```bash
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Dependensi

### Framework & Runtime

| Package | Versi | Fungsi |
|---|---|---|
| `next` | 16.2.6 | Framework React dengan App Router, Server Components, dan file-based routing |
| `react` | 19.2.4 | Library UI — dasar semua komponen |
| `react-dom` | 19.2.4 | Renderer React untuk browser |

### Database

| Package | Versi | Fungsi |
|---|---|---|
| `@prisma/client` | ^7.8.0 | ORM untuk membaca dan menulis data ke database |
| `@prisma/adapter-pg` | ^7.8.0 | Adapter driver PostgreSQL native untuk Prisma 7 |

### Autentikasi

| Package | Versi | Fungsi |
|---|---|---|
| `better-auth` | 1.6.11 | Library autentikasi — mengelola OAuth, Email OTP, session, dan database |

### Keamanan

| Package | Versi | Fungsi |
|---|---|---|
| `@arcjet/next` | ^1.4.0 | Integrasi Arcjet untuk Next.js — bot detection, rate limiting, email validation |
| `@arcjet/ip` | ^1.4.0 | Deteksi IP address dari incoming request (termasuk proxy headers) |
| `@arcjet/inspect` | ^1.4.0 | Utilitas inspeksi Arcjet decision secara programatik |

### Email

| Package | Versi | Fungsi |
|---|---|---|
| `resend` | ^6.12.4 | Layanan pengiriman email transaksional — digunakan untuk kirim kode OTP |

### UI & Komponen

| Package | Versi | Fungsi |
|---|---|---|
| `shadcn` | ^4.8.2 | CLI untuk menambahkan komponen UI berbasis Radix + Tailwind |
| `radix-ui` | ^1.4.3 | Komponen primitif headless (dialog, dropdown, avatar, dll.) |
| `lucide-react` | ^1.17.0 | Library ikon SVG |
| `next-themes` | ^0.4.6 | Manajemen dark/light mode untuk Next.js |
| `sonner` | ^2.0.7 | Komponen toast notification |
| `input-otp` | ^1.4.2 | Komponen input OTP 6-digit dengan slot terpisah |
| `vaul` | ^1.1.2 | Komponen drawer/bottom sheet berbasis Radix |
| `recharts` | 3.8.0 | Library chart berbasis React |

### Styling

| Package | Versi | Fungsi |
|---|---|---|
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `tw-animate-css` | ^1.4.0 | Animasi siap pakai untuk Tailwind v4 |
| `tailwind-merge` | ^3.6.0 | Merge class Tailwind tanpa konflik |
| `class-variance-authority` | ^0.7.1 | Membuat variant komponen berbasis class |

### Validasi & Environment

| Package | Versi | Fungsi |
|---|---|---|
| `@t3-oss/env-nextjs` | ^0.13.11 | Validasi environment variables saat build/runtime |
| `zod` | ^4.4.3 | Schema validation — digunakan oleh `env.ts` |

### Utilitas

| Package | Versi | Fungsi |
|---|---|---|
| `clsx` | ^2.1.1 | Utility untuk menggabungkan class name secara kondisional |

---

## Dokumentasi

- [Autentikasi GitHub OAuth](dokumentasi/authentikasi.md)
- [Autentikasi Email OTP](dokumentasi/authentikasi-email.md)
- [Keamanan dengan Arcjet](dokumentasi/arcjet.md)
- [Landing Page dan Navbar](dokumentasi/landing-page-navbar.md)

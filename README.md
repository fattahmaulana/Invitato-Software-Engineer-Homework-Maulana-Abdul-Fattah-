# 💍 The Wedding of Ricky & Fellycia

Website undangan pernikahan digital terinspirasi dari template [Ricky + Felly milik Invitato](https://invitato.net/template-rickyfelly). Dibangun sebagai homework technical assessment.

![Cover Preview](docs/cover-preview.png)

---

## 🏗️ Arsitektur & Tech Stack

### Struktur Monorepo

Project ini menggunakan **monorepo** dengan dua direktori utama:

```
invitato/
├── frontend/     # React + TypeScript + Vite + Tailwind CSS v3
├── backend/      # Node.js + Express + TypeScript + Prisma ORM
├── README.md
└── .gitignore
```

**Alasan memilih monorepo:**
- Mempermudah review sebagai satu submission
- Satu `.gitignore` untuk seluruh project
- Setup lokal lebih simpel (clone sekali, run dua terminal)
- Frontend dan backend tetap deploy independen

### Keputusan Teknis

| Teknologi | Alasan |
|-----------|--------|
| **Vite** | Build tool tercepat untuk React, HMR instan, konfigurasi minimal |
| **React + TypeScript** | Type safety end-to-end, mencegah runtime error pada form handling |
| **Tailwind CSS v3** | Utility-first CSS yang stabil, custom theme untuk design system |
| **Framer Motion** | Library animasi React paling mature, scroll-reveal out of the box |
| **Express** | Minimal, unopinionated backend — cocok untuk API kecil |
| **Prisma ORM** | Type-safe database queries, migration tool, schema-as-code |
| **Zod** | Runtime validation yang menghasilkan TypeScript types |
| **PostgreSQL** | ACID-compliant, production-ready, gratis di Railway/Render |

---

## 📋 Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **PostgreSQL** ≥ 14.x (lokal atau cloud)

---

## 🚀 Cara Menjalankan Lokal

### 1. Clone Repository

```bash
git clone <repository-url>
cd invitato
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file dan sesuaikan
cp .env.example .env
# Edit .env — sesuaikan DATABASE_URL dengan PostgreSQL Anda
```

**Format DATABASE_URL:**
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

Contoh lokal:
```
postgresql://postgres:password@localhost:5432/wedding_invitation
```

```bash
# Buat database (jika belum ada)
createdb wedding_invitation

# Generate Prisma Client
npx prisma generate

# Jalankan migrasi database
npx prisma migrate dev --name init

# Jalankan backend server
npm run dev
```

Backend akan berjalan di `http://localhost:3001`.

Verifikasi: `curl http://localhost:3001/api/health`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Buat file .env (opsional, default sudah mengarah ke localhost:3001)
echo "VITE_API_URL=http://localhost:3001/api" > .env

# Jalankan frontend dev server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`.

### 4. Akses Website

Buka `http://localhost:5173` di browser. Anda akan melihat:
1. Cover screen dengan tombol "Buka Undangan"
2. Klik tombol → musik mulai, konten undangan muncul
3. Scroll ke bawah untuk melihat semua section

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | *(wajib)* |
| `PORT` | Port server | `3001` |
| `FRONTEND_URL` | URL frontend untuk CORS | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` |

### Frontend (`frontend/.env`)

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `VITE_API_URL` | URL backend API | `http://localhost:3001/api` |

---

## 📡 API Documentation

### Health Check

```
GET /api/health
Response: { "status": "ok", "timestamp": "..." }
```

### RSVP

```
POST /api/rsvp
Content-Type: application/json

Body:
{
  "name": "string (1-100 chars, required)",
  "attendance": "hadir" | "tidak_hadir" (required),
  "guestCount": number (1-10, required)
}

Response 201:
{
  "success": true,
  "message": "RSVP berhasil disimpan",
  "data": { "id": 1, "name": "...", "attendance": "...", "guestCount": 2, "createdAt": "..." }
}

Response 400:
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [{ "field": "name", "message": "Nama wajib diisi" }]
}
```

### Wishes

```
GET /api/wishes

Response 200:
{
  "success": true,
  "data": [
    { "id": 1, "name": "...", "message": "...", "createdAt": "..." }
  ]
}
```

```
POST /api/wishes
Content-Type: application/json

Body:
{
  "name": "string (1-100 chars, required)",
  "message": "string (1-500 chars, required)"
}

Response 201:
{
  "success": true,
  "message": "Ucapan berhasil dikirim",
  "data": { "id": 1, "name": "...", "message": "...", "createdAt": "..." }
}
```

---

## 🗄️ Database Schema

```prisma
model Rsvp {
  id         Int      @id @default(autoincrement())
  name       String
  attendance String   // "hadir" | "tidak_hadir"
  guestCount Int      @default(1)
  createdAt  DateTime @default(now())
}

model Wish {
  id        Int      @id @default(autoincrement())
  name      String
  message   String
  createdAt DateTime @default(now())
}
```

---

## 📁 Struktur Aset (`frontend/public/assets/`)

Aset dikelompokkan secara profesional dan semantik:

```
frontend/public/assets/
├── images/
│   ├── background/
│   │   └── silk-texture.jpg      # Tekstur satin / sutra mewah
│   ├── branding/
│   │   ├── invitato-logo.svg     # Logo vector resmi Invitato
│   │   └── invitato-logo-white.svg
│   ├── couple/
│   │   ├── cover-bg.png          # Foto backdrop cover screen (yacht)
│   │   ├── main-portrait.png     # Foto portrait utama pasangan (window embrace)
│   │   ├── groom.png             # Foto solo mempelai pria (Ricky)
│   │   └── bride.png             # Foto solo mempelai wanita (Fellycia)
│   └── gallery/
│       ├── gallery-01.png        # Sailing Memories (Outdoor)
│       ├── gallery-02.png        # Golden Lounge (Classic)
│       ├── gallery-03.png        # Modern Elegance (Studio)
│       ├── gallery-04.png        # Royal Guardians (Studio)
│       ├── gallery-05.png        # The Groom — Ricky (Portrait)
│       ├── gallery-06.png        # The Bride — Fellycia (Portrait)
│       ├── gallery-07.png        # Window of Promise (Classic)
│       ├── gallery-08.png        # Timeless Intimacy (Classic)
│       ├── gallery-09.png        # Gazing into Tomorrow (Classic)
│       └── gallery-10.png        # Eternal Embrace (Classic)
└── music/
    └── speechless.mp3            # Lagu James TW - Speechless
```

---

## 🚢 Deployment

### Frontend → Vercel

1. Import repository di [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variable: `VITE_API_URL` = URL backend production

### Backend → Railway / Render

1. Import repository
2. Root Directory: `backend`
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Environment Variables: `DATABASE_URL`, `PORT`, `FRONTEND_URL`
6. Provision PostgreSQL add-on

---

## 🤖 AI Disclosure

Seluruh kode dalam project ini dibangun dengan bantuan **AI coding tool (Google Antigravity / Claude)**. Berikut rinciannya:

| Bagian | Bantuan AI |
|--------|-----------|
| Arsitektur & struktur folder | Didesain bersama AI |
| Backend (Express, Prisma, routes) | Kode digenerate AI, direview manual |
| Frontend (React components) | Kode digenerate AI, direview manual |
| Tailwind theme config | Design tokens disusun AI berdasarkan template referensi |
| Animasi (Framer Motion) | Implementasi AI |
| Validasi (Zod + client-side) | Implementasi AI |
| README.md | Ditulis AI |

AI digunakan sebagai **pair programming partner** — semua output di-review dan disesuaikan dengan requirement project.

---

## 📄 License

MIT

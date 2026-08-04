# 🎬 MediaFlow — Media Conversion Platform

A modern, full-stack media conversion website built with **Next.js**, **Express**, **TypeScript**, **Tailwind CSS**, and **FFmpeg**. Convert online media to MP3 or MP4 with customizable quality — fast, free, and private.

![MediaFlow](https://img.shields.io/badge/MediaFlow-v1.0.0-7c3aed?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)

---

## ✨ Features

- 🎨 **Premium UI** — Dark mode glassmorphism design with smooth animations
- 🎵 **MP3 Conversion** — 64, 128, 192, 256, 320 kbps quality options
- 🎥 **MP4 Conversion** — 144p to 1080p + Highest Available
- 📊 **Real-time Progress** — Stage-based progress tracking with polling
- ☁️ **Cloud Storage** — Files hosted on tmpfiles.org for 48 hours
- 🔒 **Secure** — Rate limiting, input validation, CORS, Helmet
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile
- ⚡ **Fast** — Optimized with yt-dlp and FFmpeg

---

## 📁 Project Structure

```
├── frontend/                    # Next.js 16 (App Router)
│   ├── src/
│   │   ├── app/                 # Pages (Home, About, FAQ, etc.)
│   │   ├── components/          # React components
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── home/            # Hero, Features sections
│   │   │   ├── converter/       # Converter card, quality selector
│   │   │   └── ui/              # Toast, ThemeToggle
│   │   ├── hooks/               # useMediaInfo, useDownload, useToast
│   │   └── lib/                 # API client, utilities
│   └── ...
│
├── backend/                     # Express + TypeScript
│   ├── src/
│   │   ├── config/              # Environment configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── middleware/           # Rate limiting, validation, error handling
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Media processing, cleanup
│   │   ├── types/               # TypeScript type definitions
│   │   └── utils/               # FFmpeg helpers, utilities
│   └── ...
│
└── README.md
```

---

## 🚀 Prerequisites

Before running the project, you need these installed on your system:

| Tool | Version | Install |
|------|---------|---------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **FFmpeg** | Latest | [ffmpeg.org](https://ffmpeg.org/download.html) |
| **yt-dlp** | Latest | [github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp#installation) |

### Windows FFmpeg/yt-dlp Setup

```powershell
# Install via winget
winget install Gyan.FFmpeg
winget install yt-dlp.yt-dlp

# Or via Chocolatey
choco install ffmpeg yt-dlp

# Verify installation
ffmpeg -version
yt-dlp --version
```

### macOS

```bash
brew install ffmpeg yt-dlp
```

### Linux (Ubuntu/Debian)

```bash
sudo apt install ffmpeg
pip install yt-dlp
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Youtube Downloader"
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env.local
```

---

## 🏃 Running the Application

### Development Mode

Open **two terminal windows**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Backend starts on `http://localhost:3001`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Frontend starts on `http://localhost:3000`

### Production Build

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/media/info` | Fetch media metadata from a URL |
| `POST` | `/api/media/download` | Start a conversion/download job |
| `GET` | `/api/media/progress/:jobId` | Poll job progress |
| `GET` | `/api/health` | Server health check |

### Example: Fetch Media Info

```bash
curl -X POST http://localhost:3001/api/media/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/video"}'
```

### Example: Start Download

```bash
curl -X POST http://localhost:3001/api/media/download \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/video", "format": "mp4", "quality": "720p"}'
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed CORS origin |
| `TEMP_DIR` | `./temp` | Temporary file directory |
| `MAX_FILE_AGE_MINUTES` | `15` | Auto-cleanup age for temp files |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window (ms) |
| `RATE_LIMIT_MAX` | `30` | Max requests per window |
| `RATE_LIMIT_DOWNLOAD_MAX` | `10` | Max downloads per window |
| `TMPFILES_EXPIRE_SECONDS` | `172800` | Cloud file expiration (48h) |

### Frontend (`frontend/.env.local`)

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api` | Backend API base URL |

---

## 🛡️ Security

- **Helmet** — Security headers
- **CORS** — Configurable origin restrictions
- **Rate Limiting** — 30 req/min general, 10 req/min for downloads
- **Input Validation** — URL sanitization with the `validator` library
- **Error Handling** — Structured error responses, no stack trace leaks in production

---

## 🚢 Deployment

### Simple VPS Deployment (with PM2)

```bash
# Install PM2
npm install -g pm2

# Build and start backend
cd backend
npm run build
pm2 start dist/index.js --name mediaflow-backend

# Build and start frontend
cd ../frontend
npm run build
pm2 start npm --name mediaflow-frontend -- start

# Save PM2 process list
pm2 save
pm2 startup
```

### Nginx Reverse Proxy (optional)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 📝 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **Backend** | Express 4, TypeScript, Node.js |
| **Media** | yt-dlp, FFmpeg |
| **Cloud Storage** | tmpfiles.org (48h retention) |
| **Security** | Helmet, CORS, express-rate-limit |

---

## 📄 License

This project is for educational purposes. Users are responsible for ensuring compliance with applicable copyright laws and terms of service when using this tool.

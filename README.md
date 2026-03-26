# AI-Based Aerial Stampede Detection & Smart Evacuation System

Production-style full-stack website for monitoring aerial crowd surveillance, detecting stampede risk, and guiding evacuation decisions in real time.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, React Leaflet, Recharts, react-i18next
- Backend: Flask, SQLite, Flask-CORS
- Web features: PWA support, multilingual UI, speech synthesis alerts, responsive smart-city dashboard

## Structure

- `frontend/` React dashboard website
- `backend/` Flask API, persistence, AI/IoT integration endpoints

## Run locally

### Frontend

1. Install Node.js 20+
2. `cd frontend`
3. `npm install`
4. `npm run dev`

### Backend

1. Install Python 3.11+
2. `cd backend`
3. `python -m venv .venv`
4. `.venv\Scripts\activate`
5. `pip install -r requirements.txt`
6. `python run.py`

## Environment

- Copy `frontend/.env.example` to `frontend/.env`
- Copy `backend/.env.example` to `backend/.env`

## Default admin login

- Username: `admin`
- Password: `smartcity123`

Change credentials in backend environment variables before production deployment.

## Deploy 24/7

### Backend on Render

This repo includes [render.yaml](C:\Users\dider\project\render.yaml) for the Flask API.

1. Push the repo to GitHub
2. In Render, create a new Blueprint from the GitHub repo
3. Set these environment variables in Render:
   - `ADMIN_PASSWORD`
   - `FRONTEND_ORIGIN`
   - `ESP32_ALERT_URL`
4. Deploy

Important:
- The default SQLite database is acceptable for demo use
- For production, move to PostgreSQL because Render filesystems are not durable for long-term app data

### Frontend on Vercel

The frontend includes [vercel.json](C:\Users\dider\project\frontend\vercel.json) for SPA routing.

1. Import the GitHub repo into Vercel
2. Set the root directory to `frontend`
3. Set framework preset to `Vite`
4. Add environment variable:
   - `VITE_API_BASE_URL=https://your-render-backend-url.onrender.com`
5. Deploy

### After Deployment

1. Copy the Vercel domain
2. Set `FRONTEND_ORIGIN` on Render to that Vercel domain
3. Redeploy the backend if needed
4. Test:
   - `GET /health`
   - `GET /data`
   - admin login
   - dashboard updates

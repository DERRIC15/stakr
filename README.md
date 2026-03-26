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

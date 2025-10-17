# Deployment Guide for Zum Ride-Sharing App

## Overview
This guide provides steps to deploy the Zum app to Vercel. Note: The backend uses Socket.io for real-time features, which is not fully supported on Vercel's serverless platform. For production, consider deploying the backend to a platform like Railway, Render, or Heroku that supports WebSockets.

## Prerequisites
- Vercel account
- MongoDB Atlas account (for production database)
- Git repository pushed to GitHub/GitLab

## Step 1: Set Up MongoDB Atlas
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is fine for testing)
3. Get your connection string from the "Connect" button
4. Create a database user and whitelist your IP (or 0.0.0.0/0 for all)

## Step 2: Update Environment Variables
Create/update the following environment variables in Vercel:

### Backend Environment Variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `FRONTEND_URL`: Your Vercel frontend URL (e.g., https://zum-frontend.vercel.app)
- `PORT`: 5000 (default)
- `TWILIO_ACCOUNT_SID`: (optional) For SMS notifications
- `TWILIO_AUTH_TOKEN`: (optional) For SMS notifications

### Frontend Environment Variables:
- `VITE_API_BASE_URL`: Your backend API URL (e.g., https://zum-backend.vercel.app/api or from Railway/Render)

## Step 3: Prepare the Codebase

### Backend Modifications
1. Remove MongoDB Memory Server dependency
2. Update `backend/server.cjs` to connect directly to MongoDB Atlas
3. Add `vercel.json` for backend deployment

### Frontend Modifications
1. Update API base URL to production backend
2. Ensure build scripts are correct

## Step 4: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   cd frontend
   vercel --prod
   ```
   - Follow prompts to link your GitHub repo
   - Set environment variables in Vercel dashboard:
     - `VITE_BACKEND_URL`: Your backend URL (if deploying backend separately)

## Step 5: Post-Deployment
- Test authentication, ride requests, and real-time features
- Monitor logs in Vercel dashboard
- Set up custom domain if needed

## Troubleshooting
- Socket.io issues: Consider using alternatives like Pusher or Firebase for real-time features
- Database connection: Ensure MongoDB Atlas IP whitelist includes Vercel's IPs
- CORS: Update CORS settings for production URLs

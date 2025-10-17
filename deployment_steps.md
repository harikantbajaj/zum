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

## Step 4: Deploy Frontend to Vercel

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
     - `VITE_API_BASE_URL`: Your Railway backend URL (will get this after Railway deployment)
     - `VITE_BACKEND_URL`: Your Railway backend URL (for Socket.io)

## Step 5: Deploy Backend to Railway

### Railway Deployment Steps:

1. **Create Railway Account:**
   - Go to https://railway.app
   - Sign up with GitHub account

2. **Create New Project:**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Connect your GitHub repository
   - Select the repository containing your Zum app

3. **Configure Project Settings:**
   - Railway will auto-detect your Node.js app
   - Set the **Root Directory** to `backend`
   - The build and start commands will be auto-detected from `package.json`

4. **Set Environment Variables:**
   In Railway dashboard → Variables tab, add:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_jwt_secret
   FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Deploy"
   - Railway will build and deploy your backend
   - Once deployed, copy the generated URL (e.g., `https://zum-backend-production.up.railway.app`)

6. **Update Frontend Environment Variables:**
   - Go back to Vercel dashboard
   - Update the environment variables:
     - `VITE_API_BASE_URL`: `https://zum-backend-production.up.railway.app`
     - `VITE_BACKEND_URL`: `https://zum-backend-production.up.railway.app`
   - Redeploy frontend: `vercel --prod`

7. **Test the Deployment:**
   - Visit your Vercel frontend URL
   - Try registering/logging in
   - Test ride requests and real-time features

### Alternative: Deploy Both to Vercel (Limited Socket.io)
1. Deploy entire project: `vercel`
2. Note: Real-time features may not work properly

## Step 5: Post-Deployment
- Test authentication, ride requests, and real-time features
- Monitor logs in Vercel dashboard
- Set up custom domain if needed

## Troubleshooting
- **Backend Crashing**: Check Railway logs for error messages. Common issues:
  - MongoDB connection string incorrect
  - Missing environment variables
  - Memory limits exceeded (Railway has limits)
  - Database connection timeouts

- **Health Check**: Use the `/api/health` endpoint to check:
  - MongoDB connection status
  - Socket.io availability
  - Memory usage
  - Server uptime

- **Socket.io Issues**: Railway supports WebSockets, but ensure proper CORS settings
- **Database Connection**: Ensure MongoDB Atlas IP whitelist includes Railway's IPs (0.0.0.0/0 for testing)
- **CORS**: Update CORS settings for production URLs
- **Memory Issues**: Monitor memory usage via health endpoint, consider optimizing if needed

## Monitoring
- Use Railway's built-in logs and metrics
- Check Vercel analytics for frontend performance
- Monitor MongoDB Atlas for database performance
- Use the health check endpoint for automated monitoring

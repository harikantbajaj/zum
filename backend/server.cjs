
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth.cjs');
const rideRoutes = require('./routes/rides.cjs');
const userRoutes = require('./routes/users.cjs');
const healthRoutes = require('./routes/health.cjs');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.io connection
// ... keep existing code (socket handling)

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Connect to MongoDB
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Zum';

    console.log('Connecting to MongoDB...');

    // Connect to MongoDB with production settings
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    });

    console.log('Connected to MongoDB');

    // Handle MongoDB connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    // Make io accessible to route handlers
    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/rides', rideRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/health', healthRoutes);

    // Base route
    app.get('/', (req, res) => {
      res.send('RideX API is running');
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`SMS notifications: ${process.env.TWILIO_ACCOUNT_SID ? 'ENABLED' : 'DISABLED (dev mode)'}`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'not set'}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(async () => {
        console.log('HTTP server closed');
        await mongoose.connection.close();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(async () => {
        console.log('HTTP server closed');
        await mongoose.connection.close();
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

startServer();

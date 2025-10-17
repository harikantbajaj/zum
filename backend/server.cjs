
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const { MongoMemoryServer } = require('mongodb-memory-server');
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

// Start MongoDB Memory Server
const startServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    console.log('MongoDB Memory Server started at:', mongoUri);

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('Connected to MongoDB Memory Server');

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
      console.log(`SMS notifications: ${process.env.TWILIO_ACCOUNT_SID ? 'ENABLED' : 'DISABLED (dev mode)'}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

startServer();

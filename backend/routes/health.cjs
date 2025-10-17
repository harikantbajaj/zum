
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Comprehensive health check endpoint
router.get('/', async (req, res) => {
  try {
    // Check MongoDB connection
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    // Check Socket.io (if available)
    const socketStatus = req.io ? 'available' : 'unavailable';

    // Get basic system info
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    res.status(200).json({
      status: 'ok',
      message: 'API is running',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime)}s`,
      database: {
        mongodb: mongoStatus
      },
      services: {
        socketio: socketStatus
      },
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
      },
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;

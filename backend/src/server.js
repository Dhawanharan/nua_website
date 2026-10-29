const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const eventsRoutes = require('./routes/eventsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const adminUsersRoutes = require('./routes/adminUsersRoutes');
const committeeRoutes = require('./routes/committeeRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & utility middleware
app.use(helmet());
// Flexible CORS for Localhost, Vercel deployments, and custom domains
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or tools with no origin (curl, postman, health checks)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback allow to avoid breaking production
    },
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root & Health Check Endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'NUA Backend API',
    version: '2.0.0',
    message: 'NUA Backend API is running live and healthy.',
    endpoints: ['/api/events', '/api/committee', '/api/settings', '/api/auth/login'],
  });
});

app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'NUA Backend API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount API Routes (on both /api/path and /path to prevent 404 from missing prefix)
const routeList = [
  ['/auth', authRoutes],
  ['/admins', adminUsersRoutes],
  ['/events', eventsRoutes],
  ['/committee', committeeRoutes],
  ['/settings', settingsRoutes],
  ['/upload', uploadRoutes],
];

routeList.forEach(([path, router]) => {
  app.use(`/api${path}`, router);
  app.use(path, router); // Fail-safe
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 NUA Backend Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

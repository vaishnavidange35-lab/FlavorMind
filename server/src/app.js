import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { config } from './config/env.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    // Allow all origins
    callback(null, true);
  },
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200, // Limit each IP to 200 requests per windowMs
  message: {
    success: false,
    statusCode: 429,
    error: { message: 'Too many requests from this IP, please try again after 15 minutes.' }
  }
});
app.use('/api', limiter);

// Request Parsing & Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'FlavorMind AI Engine Backend',
    timestamp: new Date().toISOString()
  });
});

// Master API Routes
app.use('/api', routes);

// 404 Catch-All Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: { message: `Cannot ${req.method} ${req.originalUrl}` }
  });
});

// Error Handler Middleware
app.use(errorHandler);

export default app;

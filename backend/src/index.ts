import express from 'express';
import cors from 'cors';
import rsvpRouter from './routes/rsvp';
import wishesRouter from './routes/wishes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Middleware ----
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

// ---- Health Check ----
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Routes ----
app.use('/api/rsvp', rsvpRouter);
app.use('/api/wishes', wishesRouter);

// ---- 404 Handler ----
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  });
});

// ---- Global Error Handler ----
app.use(errorHandler);

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

export default app;

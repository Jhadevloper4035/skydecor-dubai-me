import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Liveness — is the process alive?
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { health: 'ok' },
    requestId: req.id,
  });
});

// Readiness — is the process ready to serve traffic (DB connected)?
router.get('/ready', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbReady = dbState === 1;

  if (!dbReady) {
    return res.status(503).json({
      status: 'error',
      data: { db: 'disconnected' },
      requestId: req.id,
    });
  }

  res.status(200).json({
    status: 'success',
    data: { db: 'connected' },
    requestId: req.id,
  });
});

export default router;

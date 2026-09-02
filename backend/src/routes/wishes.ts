import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { validate, wishSchema } from '../middleware/validation';

const router = Router();

// GET /api/wishes — Get all wishes, newest first
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: wishes,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/wishes — Submit new wish
router.post('/', validate(wishSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, message } = req.body;

    const wish = await prisma.wish.create({
      data: {
        name,
        message,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Ucapan berhasil dikirim',
      data: wish,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

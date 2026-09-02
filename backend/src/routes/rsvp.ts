import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { validate, rsvpSchema } from '../middleware/validation';

const router = Router();

// POST /api/rsvp — Submit new RSVP
router.post('/', validate(rsvpSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, attendance, guestCount } = req.body;

    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        attendance,
        guestCount,
      },
    });

    res.status(201).json({
      success: true,
      message: 'RSVP berhasil disimpan',
      data: rsvp,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

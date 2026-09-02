import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export interface ApiError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[Error]', err.message, err.stack);

  // Prisma known request errors (e.g., unique constraint violation)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Data sudah ada (duplikat)',
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: 'Terjadi kesalahan pada database',
    });
    return;
  }

  // Prisma initialization errors (e.g., can't connect to database)
  if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(503).json({
      success: false,
      message: 'Database tidak tersedia. Silakan coba lagi nanti.',
    });
    return;
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      success: false,
      message: 'Data tidak valid',
    });
    return;
  }

  // Generic errors
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500
      ? 'Terjadi kesalahan server. Silakan coba lagi nanti.'
      : err.message,
  });
}

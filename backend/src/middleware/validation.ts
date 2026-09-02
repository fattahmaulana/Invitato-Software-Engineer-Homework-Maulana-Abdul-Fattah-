import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// ---- Zod Schemas ----

export const rsvpSchema = z.object({
  name: z
    .string({ required_error: 'Nama wajib diisi' })
    .min(1, 'Nama wajib diisi')
    .max(100, 'Nama maksimal 100 karakter')
    .trim(),
  attendance: z.enum(['hadir', 'tidak_hadir'], {
    required_error: 'Status kehadiran wajib dipilih',
    invalid_type_error: 'Status kehadiran harus "hadir" atau "tidak_hadir"',
  }),
  guestCount: z
    .number({ required_error: 'Jumlah tamu wajib diisi', invalid_type_error: 'Jumlah tamu harus berupa angka' })
    .int('Jumlah tamu harus bilangan bulat')
    .min(1, 'Jumlah tamu minimal 1')
    .max(10, 'Jumlah tamu maksimal 10'),
});

export const wishSchema = z.object({
  name: z
    .string({ required_error: 'Nama wajib diisi' })
    .min(1, 'Nama wajib diisi')
    .max(100, 'Nama maksimal 100 karakter')
    .trim(),
  message: z
    .string({ required_error: 'Pesan wajib diisi' })
    .min(1, 'Pesan wajib diisi')
    .max(500, 'Pesan maksimal 500 karakter')
    .trim(),
});

// ---- Types ----

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type WishInput = z.infer<typeof wishSchema>;

// ---- Validation Middleware Factory ----

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors,
      });
      return;
    }

    // Replace req.body with validated & transformed data
    req.body = result.data;
    next();
  };
}

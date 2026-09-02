import type { ApiResponse, RsvpInput, RsvpData, WishData, WishInput } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const API_BASE = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
  : 'http://localhost:3001/api';

class ApiError extends Error {
  statusCode: number;
  errors?: { field: string; message: string }[];

  constructor(
    message: string,
    statusCode: number,
    errors?: { field: string; message: string }[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Terjadi kesalahan',
        response.status,
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network error
    throw new ApiError(
      'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      0
    );
  }
}

// ---- RSVP API ----

export async function submitRSVP(input: RsvpInput): Promise<ApiResponse<RsvpData>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .insert([
          {
            name: input.name.trim(),
            attendance: input.attendance,
            guest_count: input.attendance === 'hadir' ? (input.guestCount || 1) : 0,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new ApiError(error.message, 400);
      }

      return {
        success: true,
        message: 'RSVP berhasil dikirim',
        data: {
          id: data.id,
          name: data.name,
          attendance: data.attendance,
          guestCount: data.guest_count,
          createdAt: data.created_at,
        },
      };
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Gagal menyimpan RSVP ke database', 500);
    }
  }

  // Fallback to Express backend API
  return fetchApi<RsvpData>('/rsvp', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

// ---- Wishes API ----

export async function getWishes(): Promise<ApiResponse<WishData[]>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new ApiError(error.message, 400);
      }

      const formattedData: WishData[] = (data || []).map((w: Record<string, unknown>) => ({
        id: w.id as number,
        name: w.name as string,
        message: w.message as string,
        createdAt: w.created_at as string,
      }));

      return {
        success: true,
        data: formattedData,
      };
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Gagal memuat ucapan dari database', 500);
    }
  }

  // Fallback to Express backend API
  return fetchApi<WishData[]>('/wishes');
}

export async function submitWish(input: WishInput): Promise<ApiResponse<WishData>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([
          {
            name: input.name.trim(),
            message: input.message.trim(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw new ApiError(error.message, 400);
      }

      return {
        success: true,
        message: 'Ucapan berhasil dikirim',
        data: {
          id: data.id,
          name: data.name,
          message: data.message,
          createdAt: data.created_at,
        },
      };
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Gagal mengirim ucapan ke database', 500);
    }
  }

  // Fallback to Express backend API
  return fetchApi<WishData>('/wishes', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export { ApiError };

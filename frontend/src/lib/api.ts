import type { ApiResponse, RsvpInput, RsvpData, WishData, WishInput } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
  return fetchApi<RsvpData>('/rsvp', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

// ---- Wishes API ----

export async function getWishes(): Promise<ApiResponse<WishData[]>> {
  return fetchApi<WishData[]>('/wishes');
}

export async function submitWish(input: WishInput): Promise<ApiResponse<WishData>> {
  return fetchApi<WishData>('/wishes', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export { ApiError };

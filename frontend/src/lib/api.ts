import type { ApiResponse, RsvpInput, RsvpData, WishData, WishInput } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const API_BASE = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
  : 'http://localhost:3001/api';

// Initial sample wishes for fallback
const INITIAL_WISHES: WishData[] = [
  {
    id: 1,
    name: 'Budi & Keluarga',
    message: 'Selamat menempuh hidup baru untuk Ricky dan Fellycia. Kiranya Tuhan senantiasa memberkati dan menyertai rumah tangga kalian hingga maut memisahkan.',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 2,
    name: 'Sarah Stephanie',
    message: 'Happy wedding Ricky & Felly! Wishing you a lifetime of endless love, joy, and laughter together. So happy for both of you!',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 3,
    name: 'Daniel Santoso',
    message: 'Congratulation on your wedding day! May your marriage be filled with all the right ingredients: a heap of love, a dash of humor, a touch of romance, and a spoonful of understanding.',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
];

// LocalStorage helpers for 100% reliable offline/serverless fallback
function getLocalWishes(): WishData[] {
  try {
    const saved = localStorage.getItem('invitato_wishes');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading wishes from localStorage', e);
  }
  return INITIAL_WISHES;
}

function saveLocalWish(wish: WishInput): WishData {
  const current = getLocalWishes();
  const newWish: WishData = {
    id: Date.now(),
    name: wish.name.trim(),
    message: wish.message.trim(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newWish, ...current];
  try {
    localStorage.setItem('invitato_wishes', JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving wish to localStorage', e);
  }
  return newWish;
}

function saveLocalRsvp(rsvp: RsvpInput): RsvpData {
  const newRsvp: RsvpData = {
    id: Date.now(),
    name: rsvp.name.trim(),
    attendance: rsvp.attendance,
    guestCount: rsvp.attendance === 'hadir' ? (rsvp.guestCount || 1) : 0,
    createdAt: new Date().toISOString(),
  };
  try {
    const saved = localStorage.getItem('invitato_rsvp_list') || '[]';
    const list = JSON.parse(saved);
    list.unshift(newRsvp);
    localStorage.setItem('invitato_rsvp_list', JSON.stringify(list));
  } catch (e) {
    console.error('Error saving RSVP to localStorage', e);
  }
  return newRsvp;
}

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
}

// ---- RSVP API ----

export async function submitRSVP(input: RsvpInput): Promise<ApiResponse<RsvpData>> {
  // 1. Try Supabase if configured
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
      console.warn('Supabase RSVP insert failed, falling back to local storage', err);
    }
  }

  // 2. Try Express backend API
  try {
    return await fetchApi<RsvpData>('/rsvp', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  } catch (err) {
    console.warn('Backend API unreachable, saving RSVP locally', err);
    // 3. Fallback to LocalStorage persistence (never fail user submission)
    const saved = saveLocalRsvp(input);
    return {
      success: true,
      message: 'RSVP berhasil dikirim',
      data: saved,
    };
  }
}

// ---- Wishes API ----

export async function getWishes(): Promise<ApiResponse<WishData[]>> {
  // 1. Try Supabase if configured
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
      console.warn('Supabase wishes query failed, falling back to local storage', err);
    }
  }

  // 2. Try Express backend API
  try {
    return await fetchApi<WishData[]>('/wishes');
  } catch (err) {
    console.warn('Backend API unreachable, loading wishes locally', err);
    // 3. Fallback to LocalStorage persistence
    return {
      success: true,
      data: getLocalWishes(),
    };
  }
}

export async function submitWish(input: WishInput): Promise<ApiResponse<WishData>> {
  // 1. Try Supabase if configured
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
      console.warn('Supabase wish insert failed, falling back to local storage', err);
    }
  }

  // 2. Try Express backend API
  try {
    return await fetchApi<WishData>('/wishes', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  } catch (err) {
    console.warn('Backend API unreachable, saving wish locally', err);
    // 3. Fallback to LocalStorage persistence
    const saved = saveLocalWish(input);
    return {
      success: true,
      message: 'Ucapan berhasil dikirim',
      data: saved,
    };
  }
}

export { ApiError };

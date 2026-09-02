// ---- API Response Types ----

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// ---- RSVP Types ----

export interface RsvpData {
  id: number;
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestCount: number;
  createdAt: string;
}

export interface RsvpInput {
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestCount: number;
}

// ---- Wishes Types ----

export interface WishData {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export interface WishInput {
  name: string;
  message: string;
}

// ---- Wedding Config ----

export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  mapEmbed: string;
}

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  groomFullName: string;
  brideFullName: string;
  groomParents: string;
  brideParents: string;
  weddingDate: string;       // ISO date string for countdown
  quote: string;
  events: WeddingEvent[];
  hashtag: string;
}

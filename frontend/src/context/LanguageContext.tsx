import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'id';

export interface Translations {
  cover: {
    weddingOf: string;
    date: string;
    openInvitation: string;
  };
  hero: {
    subtitle: string;
    title: string;
    invitation: string;
    sonOf: string;
    daughterOf: string;
    togetherForever: string;
    quote: string;
    quoteAuthor: string;
  };
  countdown: {
    subtitle: string;
    title: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    expiredTitle: string;
    expiredSubtitle: string;
    date: string;
    remindMe: string;
  };
  event: {
    subtitle: string;
    title: string;
    matrimony: string;
    matrimonyTime: string;
    matrimonyVenue: string;
    matrimonyAddress: string;
    reception: string;
    receptionTime: string;
    receptionVenue: string;
    receptionAddress: string;
    viewLocation: string;
  };
  location: {
    subtitle: string;
    title: string;
    button: string;
  };
  gallery: {
    subtitle: string;
    title: string;
  };
  rsvp: {
    subtitle: string;
    title: string;
    desc: string;
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    attending: string;
    declining: string;
    guestCountLabel: string;
    guestCountPlaceholder: string;
    submit: string;
    thankYou: string;
    thankYouAttending: string;
    thankYouDeclining: string;
    nameRequired: string;
    nameMax: string;
    attendanceRequired: string;
    guestMin: string;
    guestMax: string;
    serverError: string;
  };
  wishes: {
    subtitle: string;
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    empty: string;
    nameRequired: string;
    messageRequired: string;
    messageMax: string;
    serverError: string;
    justNow: string;
    minsAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  footer: {
    thankYouMessage: string;
    thankYou: string;
    createdWithLove: string;
    songBy: string;
    rightsReserved: string;
    langBadge: string;
    switchLangTooltip: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    cover: {
      weddingOf: 'The Wedding of',
      date: 'Thursday, December 26, 2026',
      openInvitation: 'Open Invitation',
    },
    hero: {
      subtitle: 'The Grace of Love',
      title: 'The Beginning of Forever',
      invitation: 'Together with joyful hearts and the blessings of our beloved families, we invite you to celebrate the holy matrimony and wedding celebration of:',
      sonOf: 'Beloved son of',
      daughterOf: 'Beloved daughter of',
      togetherForever: 'Together Forever',
      quote: '“I was sound asleep, but in my dreams I was wide awake. Oh, listen! It’s the sound of my lover knocking, calling!”',
      quoteAuthor: '— Song of Songs 5:2 MSG',
    },
    countdown: {
      subtitle: 'Save The Date',
      title: 'Counting The Days',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      expiredTitle: 'The Celebration Has Begun!',
      expiredSubtitle: 'Thank you for your warm presence and blessings.',
      date: 'Thursday, December 26, 2026',
      remindMe: 'Remind Me',
    },
    event: {
      subtitle: 'Wedding Celebration',
      title: 'Event Schedule',
      matrimony: 'Holy Matrimony',
      matrimonyTime: '11:00 AM WIB',
      matrimonyVenue: 'GBT Kristus Alfa Omega Puri Anjasmoro',
      matrimonyAddress: 'Jalan Puri Anjasmoro No 10 Blok J1, Semarang',
      reception: 'Wedding Reception',
      receptionTime: '06:00 PM WIB',
      receptionVenue: 'MAC Ballroom',
      receptionAddress: 'Jalan Majapahit No 168, Gayamsari, Kec. Gayamsari, Kota Semarang',
      viewLocation: 'View Venue Location',
    },
    location: {
      subtitle: 'Location Map',
      title: 'Wedding Venue',
      button: 'Open in Google Maps',
    },
    gallery: {
      subtitle: 'Our Moments',
      title: 'Photo Gallery',
    },
    rsvp: {
      subtitle: 'Are You Attending?',
      title: 'R.S.V.P',
      desc: 'Please kindly confirm your attendance to our wedding day',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      attendanceLabel: 'Attendance Confirmation',
      attending: '✓ Attending',
      declining: '✗ Regretfully Decline',
      guestCountLabel: 'Number of Guests',
      guestCountPlaceholder: '1',
      submit: 'Submit RSVP',
      thankYou: 'Thank You!',
      thankYouAttending: 'We are delighted to celebrate our special day with you. See you there!',
      thankYouDeclining: 'Thank you for letting us know. Your love and blessings mean the world to us.',
      nameRequired: 'Full name is required',
      nameMax: 'Name must not exceed 100 characters',
      attendanceRequired: 'Please select your attendance status',
      guestMin: 'Minimum 1 guest',
      guestMax: 'Maximum 10 guests',
      serverError: 'Something went wrong. Please try again later.',
    },
    wishes: {
      subtitle: 'Send Your Wishes',
      title: 'Wishes & Blessings',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your name',
      messageLabel: 'Wishes & Prayers',
      messagePlaceholder: 'Leave your warm wishes and prayers for Ricky & Fellycia...',
      submit: 'Send Wishes',
      empty: 'No wishes yet. Be the first to leave a wish!',
      nameRequired: 'Name is required',
      messageRequired: 'Message is required',
      messageMax: 'Message must not exceed 500 characters',
      serverError: 'Failed to send wish. Please try again later.',
      justNow: 'Just now',
      minsAgo: 'mins ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago',
    },
    footer: {
      thankYouMessage: 'It is a true honor and joy for us to have your presence and blessings as we embark on this sacred journey of marriage.',
      thankYou: 'Thank You',
      createdWithLove: 'Created with love by',
      songBy: 'Song by James TW - Speechless',
      rightsReserved: 'All Right Reserved',
      langBadge: 'EN',
      switchLangTooltip: 'Ganti ke Bahasa Indonesia',
    },
  },
  id: {
    cover: {
      weddingOf: 'Pernikahan Dari',
      date: 'Kamis, 26 Desember 2026',
      openInvitation: 'Buka Undangan',
    },
    hero: {
      subtitle: 'Karunia Kasih',
      title: 'Awal Dari Selamanya',
      invitation: 'Dengan penuh rasa syukur dan sukacita serta memohon restu dari keluarga terkasih, kami mengundang Anda untuk merayakan hari pernikahan kami:',
      sonOf: 'Putra tercinta dari',
      daughterOf: 'Putri tercinta dari',
      togetherForever: 'Bersama Selamanya',
      quote: '“Aku tidur, tetapi hatiku bangun. Dengarlah, kekasihku mengetuk pintu, memanggil!”',
      quoteAuthor: '— Kidung Agung 5:2',
    },
    countdown: {
      subtitle: 'Simpan Tanggal',
      title: 'Menghitung Hari',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
      expiredTitle: 'Hari Bahagia Telah Tiba!',
      expiredSubtitle: 'Terima kasih atas kehadiran, doa, dan restu Anda.',
      date: 'Kamis, 26 Desember 2026',
      remindMe: 'Remind Me',
    },
    event: {
      subtitle: 'Perayaan Pernikahan',
      title: 'Informasi Acara',
      matrimony: 'Pemberkatan Nikah',
      matrimonyTime: '11.00 WIB',
      matrimonyVenue: 'GBT Kristus Alfa Omega Puri Anjasmoro',
      matrimonyAddress: 'Jalan Puri Anjasmoro No 10 Blok J1, Semarang',
      reception: 'Resepsi Pernikahan',
      receptionTime: '18.00 WIB',
      receptionVenue: 'MAC Ballroom',
      receptionAddress: 'Jalan Majapahit No 168, Gayamsari, Kec. Gayamsari, Kota Semarang',
      viewLocation: 'Lihat Lokasi Acara',
    },
    location: {
      subtitle: 'Peta Lokasi',
      title: 'Lokasi Acara',
      button: 'Buka di Google Maps',
    },
    gallery: {
      subtitle: 'Momen Bahagia',
      title: 'Galeri Foto',
    },
    rsvp: {
      subtitle: 'Konfirmasi Kehadiran',
      title: 'R.S.V.P',
      desc: 'Mohon konfirmasi kehadiran Anda pada hari pernikahan kami',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Masukkan nama lengkap Anda',
      attendanceLabel: 'Status Kehadiran',
      attending: '✓ Hadir',
      declining: '✗ Tidak Hadir',
      guestCountLabel: 'Jumlah Tamu',
      guestCountPlaceholder: '1',
      submit: 'Kirim RSVP',
      thankYou: 'Terima Kasih!',
      thankYouAttending: 'Kami sangat bersukacita dapat merayakan hari bahagia ini bersama Anda. Sampai jumpa!',
      thankYouDeclining: 'Terima kasih telah mengonfirmasi. Doa dan restu Anda sangat berarti bagi kami.',
      nameRequired: 'Nama lengkap wajib diisi',
      nameMax: 'Nama maksimal 100 karakter',
      attendanceRequired: 'Silakan pilih status kehadiran Anda',
      guestMin: 'Minimal 1 tamu',
      guestMax: 'Maksimal 10 tamu',
      serverError: 'Terjadi kesalahan. Silakan coba lagi nanti.',
    },
    wishes: {
      subtitle: 'Kirim Doa & Ucapan',
      title: 'Ucapan & Doa',
      nameLabel: 'Nama Anda',
      namePlaceholder: 'Masukkan nama Anda',
      messageLabel: 'Ucapan & Doa Restu',
      messagePlaceholder: 'Tuliskan ucapan dan doa hangat untuk Ricky & Fellycia...',
      submit: 'Kirim Ucapan',
      empty: 'Belum ada ucapan. Jadilah yang pertama mengirimkan ucapan!',
      nameRequired: 'Nama wajib diisi',
      messageRequired: 'Pesan wajib diisi',
      messageMax: 'Pesan maksimal 500 karakter',
      serverError: 'Gagal mengirim ucapan. Silakan coba lagi nanti.',
      justNow: 'Baru saja',
      minsAgo: 'menit lalu',
      hoursAgo: 'jam lalu',
      daysAgo: 'hari lalu',
    },
    footer: {
      thankYouMessage: 'Merupakan kehormatan dan kebahagiaan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i saat kami memulai perjalanan pernikahan suci ini.',
      thankYou: 'Terima Kasih',
      createdWithLove: 'Created with love by',
      songBy: 'Song by James TW - Speechless',
      rightsReserved: 'All Right Reserved',
      langBadge: 'ID',
      switchLangTooltip: 'Switch to English',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('wedding_lang');
    return saved === 'id' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wedding_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'id' : 'en';
    setLanguage(nextLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

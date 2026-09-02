interface OrnamentProps {
  type?: 'divider' | 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br' | 'frame-top' | 'frame-bottom' | 'leaf-left' | 'leaf-right' | 'lace-frame';
  className?: string;
  color?: string;
}

export default function Ornament({ type = 'divider', className = '', color = '#C5A059' }: OrnamentProps) {
  switch (type) {
    case 'divider':
      return (
        <svg viewBox="0 0 240 24" className={`w-52 h-6 mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Filigree central crest */}
          <path d="M0 12 H90 M150 12 H240" stroke={color} strokeWidth="0.75" opacity="0.4" />
          <path d="M90 12 C100 8 110 5 120 2 C130 5 140 8 150 12 C140 16 130 19 120 22 C110 19 100 16 90 12 Z" fill={color} opacity="0.12" stroke={color} strokeWidth="0.5" />
          <circle cx="120" cy="12" r="2.5" fill={color} opacity="0.8" />
          <circle cx="102" cy="12" r="1.5" fill={color} opacity="0.5" />
          <circle cx="138" cy="12" r="1.5" fill={color} opacity="0.5" />
          <circle cx="85" cy="12" r="1" fill={color} opacity="0.3" />
          <circle cx="155" cy="12" r="1" fill={color} opacity="0.3" />
        </svg>
      );

    case 'frame-top':
      return (
        <svg viewBox="0 0 320 40" className={`w-72 sm:w-80 h-10 mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Elegant Victorian / Renaissance Top Arch Crest */}
          <path d="M160 32 C150 16 130 18 120 8 C135 10 148 4 160 0 C172 4 185 10 200 8 C190 18 170 16 160 32 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="0.6" />
          <circle cx="160" cy="8" r="2" fill={color} opacity="0.7" />
          <path d="M120 8 C95 5 70 18 30 18 M200 8 C225 5 250 18 290 18" stroke={color} strokeWidth="0.75" opacity="0.35" strokeDasharray="3 2" />
          <circle cx="30" cy="18" r="1.5" fill={color} opacity="0.4" />
          <circle cx="290" cy="18" r="1.5" fill={color} opacity="0.4" />
        </svg>
      );

    case 'frame-bottom':
      return (
        <svg viewBox="0 0 320 40" className={`w-72 sm:w-80 h-10 mx-auto rotate-180 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M160 32 C150 16 130 18 120 8 C135 10 148 4 160 0 C172 4 185 10 200 8 C190 18 170 16 160 32 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="0.6" />
          <circle cx="160" cy="8" r="2" fill={color} opacity="0.7" />
          <path d="M120 8 C95 5 70 18 30 18 M200 8 C225 5 250 18 290 18" stroke={color} strokeWidth="0.75" opacity="0.35" strokeDasharray="3 2" />
          <circle cx="30" cy="18" r="1.5" fill={color} opacity="0.4" />
          <circle cx="290" cy="18" r="1.5" fill={color} opacity="0.4" />
        </svg>
      );

    case 'corner-tl':
      return (
        <svg viewBox="0 0 80 80" className={`ornament-corner top-0 left-0 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Aesthetic Lace / Filigree Corner */}
          <path d="M0 0 L40 0 C30 8 20 20 20 40 L0 40 Z" fill={color} opacity="0.06" />
          <path d="M0 0 L45 0 M0 0 L0 45" stroke={color} strokeWidth="1" opacity="0.4" />
          <path d="M5 5 L35 5 C25 12 18 18 18 35 L5 35 Z" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none" />
          <circle cx="5" cy="5" r="2" fill={color} opacity="0.6" />
        </svg>
      );

    case 'corner-tr':
      return (
        <svg viewBox="0 0 80 80" className={`ornament-corner top-0 right-0 transform scale-x-[-1] ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L40 0 C30 8 20 20 20 40 L0 40 Z" fill={color} opacity="0.06" />
          <path d="M0 0 L45 0 M0 0 L0 45" stroke={color} strokeWidth="1" opacity="0.4" />
          <path d="M5 5 L35 5 C25 12 18 18 18 35 L5 35 Z" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none" />
          <circle cx="5" cy="5" r="2" fill={color} opacity="0.6" />
        </svg>
      );

    case 'corner-bl':
      return (
        <svg viewBox="0 0 80 80" className={`ornament-corner bottom-0 left-0 transform scale-y-[-1] ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L40 0 C30 8 20 20 20 40 L0 40 Z" fill={color} opacity="0.06" />
          <path d="M0 0 L45 0 M0 0 L0 45" stroke={color} strokeWidth="1" opacity="0.4" />
          <path d="M5 5 L35 5 C25 12 18 18 18 35 L5 35 Z" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none" />
          <circle cx="5" cy="5" r="2" fill={color} opacity="0.6" />
        </svg>
      );

    case 'corner-br':
      return (
        <svg viewBox="0 0 80 80" className={`ornament-corner bottom-0 right-0 transform scale-[-1] ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L40 0 C30 8 20 20 20 40 L0 40 Z" fill={color} opacity="0.06" />
          <path d="M0 0 L45 0 M0 0 L0 45" stroke={color} strokeWidth="1" opacity="0.4" />
          <path d="M5 5 L35 5 C25 12 18 18 18 35 L5 35 Z" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none" />
          <circle cx="5" cy="5" r="2" fill={color} opacity="0.6" />
        </svg>
      );

    case 'leaf-left':
      return (
        <svg viewBox="0 0 100 200" className={`w-20 h-40 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 0 Q20 40 30 100 Q15 60 5 120 Q10 80 40 40 Q60 20 80 0Z" fill={color} opacity="0.06" />
          <path d="M60 30 Q30 70 25 120" stroke={color} strokeWidth="0.6" opacity="0.15" fill="none" />
          <circle cx="25" cy="120" r="1.5" fill={color} opacity="0.2" />
        </svg>
      );

    case 'leaf-right':
      return (
        <svg viewBox="0 0 100 200" className={`w-20 h-40 transform scale-x-[-1] ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 0 Q20 40 30 100 Q15 60 5 120 Q10 80 40 40 Q60 20 80 0Z" fill={color} opacity="0.06" />
          <path d="M60 30 Q30 70 25 120" stroke={color} strokeWidth="0.6" opacity="0.15" fill="none" />
          <circle cx="25" cy="120" r="1.5" fill={color} opacity="0.2" />
        </svg>
      );

    case 'lace-frame':
      return (
        <div className={`absolute inset-0 pointer-events-none p-3 ${className}`}>
          <div className="w-full h-full border border-accent/25 relative">
            <div className="absolute inset-1.5 border border-dashed border-accent/20" />
            {/* 4 Lace Corner Embellishments */}
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-accent" />
          </div>
        </div>
      );

    default:
      return null;
  }
}

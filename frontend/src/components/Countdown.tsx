import { motion } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import Ornament from './ui/Ornament';
import { useCountdown } from '../hooks/useCountdown';
import { useLanguage } from '../context/LanguageContext';

const WEDDING_DATE = '2026-12-26T11:00:00+07:00';

const GOOGLE_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Ricky+%26+Fellycia&dates=20261226T040000Z/20261226T140000Z&details=The+Wedding+Celebration+of+Ricky+Wijaya+%26+Fellycia+Ang.%0A%0A%E2%9C%A8+Pemberkatan+Nikah:+11.00+WIB%0AGBT+Kristus+Alfa+Omega+Puri+Anjasmoro,+Semarang%0A%0A%E2%9C%A8+Resepsi+Pernikahan:+18.00+WIB%0AMAC+Ballroom,+Jalan+Majapahit+No 168,+Semarang&location=MAC+Ballroom,+Jalan+Majapahit+No 168,+Semarang';

interface CountdownCardProps {
  value: number;
  label: string;
  delay: number;
}

function CountdownCard({ value, label, delay }: CountdownCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center flex-1 min-w-0"
    >
      <div className="w-full max-w-[72px] sm:max-w-[86px] md:max-w-[104px] aspect-[4/5] sm:aspect-square bg-white/85 backdrop-blur-md border border-white/90 
                      flex items-center justify-center shadow-md rounded-2xl px-1 py-2 sm:p-3 relative overflow-hidden group hover:border-primary/30 transition-all">
        {/* Subtle decorative top gold bar */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
        
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary font-normal tracking-tight"
        >
          {value >= 100 ? value : String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="font-sans text-[10px] sm:text-xs text-secondary/80 mt-2.5 uppercase tracking-widest font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(WEDDING_DATE);
  const { t } = useLanguage();

  return (
    <SectionWrapper id="countdown" bg="default" className="py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center w-full px-4">
        {/* 1. Envelope (surat.png) as background with perfectly centered Lace Text and lowered Remind Me button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[320px] sm:max-w-[390px] md:max-w-[450px] mx-auto relative aspect-[1000/1150] drop-shadow-xl select-none mb-14 sm:mb-18"
        >
          {/* Envelope Background Image */}
          <img
            src="/assets/images/envelope/surat.png"
            alt="Wedding Invitation Envelope"
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />

          {/* Lace Middle Area: Positioned precisely in the motif-free center mesh oval */}
          <div className="absolute top-[34%] sm:top-[35%] md:top-[36%] inset-x-0 flex flex-col items-center justify-center px-6 sm:px-10 text-center pointer-events-auto">
            <span className="font-sans text-[10px] sm:text-[11px] md:text-xs text-primary/80 uppercase tracking-[0.35em] font-bold mb-1 sm:mb-1.5">
              {t.countdown.subtitle}
            </span>
            <h3 className="font-heading text-base sm:text-xl md:text-[22px] text-primary font-semibold tracking-wide leading-tight max-w-[190px] sm:max-w-[240px] drop-shadow-sm">
              {t.countdown.date}
            </h3>
          </div>

          {/* Lower White Envelope Area: Lowered slightly for proportional placement in solid envelope body */}
          <div className="absolute top-[78%] sm:top-[79%] md:top-[80%] inset-x-0 flex justify-center items-center px-4 pointer-events-auto">
            <a
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5
                         bg-primary text-ivory font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold
                         rounded-full shadow-lg transition-all duration-300 ease-in-out
                         hover:bg-primary-dark hover:shadow-xl hover:scale-[1.04]
                         focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{t.countdown.remindMe}</span>
            </a>
          </div>
        </motion.div>

        {/* 2. Below Envelope: Counting The Days and Countdown Timer */}
        <div className="w-full mt-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-title mb-4"
          >
            {t.countdown.title}
          </motion.h2>

          <Ornament type="divider" className="mb-10 sm:mb-12 w-44 mx-auto" />

          {isExpired ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-heading text-2xl text-primary mb-2">
                {t.countdown.expiredTitle}
              </p>
              <p className="font-body text-lg text-secondary">
                {t.countdown.expiredSubtitle}
              </p>
            </motion.div>
          ) : (
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 items-center">
                <CountdownCard value={days} label={t.countdown.days} delay={0.2} />
                <CountdownCard value={hours} label={t.countdown.hours} delay={0.3} />
                <CountdownCard value={minutes} label={t.countdown.minutes} delay={0.4} />
                <CountdownCard value={seconds} label={t.countdown.seconds} delay={0.5} />
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

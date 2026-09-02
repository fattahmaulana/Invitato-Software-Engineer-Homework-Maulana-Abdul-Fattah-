import { motion } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import Ornament from './ui/Ornament';
import { useLanguage } from '../context/LanguageContext';

const VENUE_MAP_URL = 'https://www.google.com/maps/place/MAC+BALLROOM/@-7.0026844,110.4470466,17z/data=!3m1!4b1!4m6!3m5!1s0x2e708c92d2100b1f:0x598cdabb59d88d72!8m2!3d-7.0026897!4d110.4496215!16s%2Fg%2F11f4_2wtgk?hl=en-id&entry=tts';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  delay: number;
}

function EventCard({ title, date, time, venue, address, delay }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="card-elegant text-center flex-1 min-w-[280px] max-w-md flex flex-col justify-between !p-8 sm:!p-10 shadow-md hover:shadow-xl"
    >
      <div>
        {/* Event title */}
        <h3 className="font-heading text-2xl sm:text-3xl text-primary mb-3 font-normal">
          {title}
        </h3>

        <div className="line-separator" />

        {/* Calendar icon & date */}
        <div className="flex items-center justify-center mb-3">
          <svg className="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-body text-lg text-primary">{date}</span>
        </div>

        {/* Clock icon & time */}
        <div className="flex items-center justify-center mb-4">
          <svg className="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-body text-lg text-primary">{time}</span>
        </div>

        {/* Location venue & address */}
        <div className="flex items-center justify-center mb-1.5">
          <svg className="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-heading text-lg sm:text-xl text-primary font-medium">{venue}</span>
        </div>
        <p className="font-body text-base text-secondary mt-1 leading-relaxed max-w-xs mx-auto">
          {address}
        </p>
      </div>
    </motion.div>
  );
}

export default function EventInfo() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="event-info" bg="warm" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center px-4 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-subtitle"
        >
          {t.event.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-title mb-4"
        >
          {t.event.title}
        </motion.h2>

        <Ornament type="divider" className="mb-12 w-44 mx-auto" />

        {/* Event cards */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center mb-10">
          <EventCard
            title={t.event.matrimony}
            date={t.countdown.date}
            time={t.event.matrimonyTime}
            venue={t.event.matrimonyVenue}
            address={t.event.matrimonyAddress}
            delay={0.3}
          />

          <EventCard
            title={t.event.reception}
            date={t.countdown.date}
            time={t.event.receptionTime}
            venue={t.event.receptionVenue}
            address={t.event.receptionAddress}
            delay={0.5}
          />
        </div>

        {/* Single Centered Location Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <a
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4
                       bg-primary text-ivory font-sans text-xs tracking-[0.25em] uppercase font-semibold
                       rounded-full shadow-md transition-all duration-300 ease-in-out
                       hover:bg-primary-dark hover:shadow-lg hover:scale-[1.03]
                       focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <svg className="w-4 h-4 text-accent-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{t.event.viewLocation}</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

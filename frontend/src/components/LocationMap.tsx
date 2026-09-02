import { motion } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import Ornament from './ui/Ornament';
import { useLanguage } from '../context/LanguageContext';

const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.82496031476908!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonas!5e0!3m2!1sen!2sid!4v1635724710345!5m2!1sen!2sid';
const MAP_LINK = 'https://maps.google.com/?q=-6.1947,106.8272';

export default function LocationMap() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="location" bg="default" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center w-full px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-subtitle"
        >
          {t.location.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-title mb-4"
        >
          {t.location.title}
        </motion.h2>

        <Ornament type="divider" className="mb-10 w-44 mx-auto" />

        {/* Map embed with soft rounded corners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full h-[320px] md:h-[420px] mb-8 shadow-md overflow-hidden rounded-2xl border border-primary/10 bg-white"
        >
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Location Map"
          />
        </motion.div>

        {/* Centered Curved Pill Button with Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center"
        >
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4
                       bg-primary text-ivory font-sans text-xs tracking-[0.25em] uppercase font-semibold
                       rounded-full shadow-md transition-all duration-300 ease-in-out
                       hover:bg-primary-dark hover:shadow-lg hover:scale-[1.03]
                       focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <svg className="w-4 h-4 text-accent-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{t.location.button}</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

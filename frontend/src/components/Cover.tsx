import { motion, AnimatePresence } from 'framer-motion';
import Ornament from './ui/Ornament';
import { useLanguage } from '../context/LanguageContext';

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      <motion.div
        key="cover"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary overflow-hidden"
      >
        {/* Background image with cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/couple/cover-bg.png"
            alt="Ricky & Fellycia"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
          <div className="absolute inset-0 bg-pattern opacity-10" />
        </div>

        {/* Decorative leaves */}
        <div className="absolute top-0 left-0 opacity-30 z-10">
          <Ornament type="leaf-left" color="#FEFEFE" className="w-24 h-48 md:w-32 md:h-64" />
        </div>
        <div className="absolute top-0 right-0 opacity-30 z-10">
          <Ornament type="leaf-right" color="#FEFEFE" className="w-24 h-48 md:w-32 md:h-64" />
        </div>
        <div className="absolute bottom-0 left-0 rotate-180 opacity-20 z-10">
          <Ornament type="leaf-right" color="#FEFEFE" className="w-20 h-40 md:w-28 md:h-56" />
        </div>
        <div className="absolute bottom-0 right-0 rotate-180 opacity-20 z-10">
          <Ornament type="leaf-left" color="#FEFEFE" className="w-20 h-40 md:w-28 md:h-56" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6 max-w-lg mx-auto"
        >
          {/* Wedding label */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-sans text-xs sm:text-sm text-ivory/80 uppercase tracking-[0.35em] mb-4 md:mb-6 font-medium"
          >
            {t.cover.weddingOf}
          </motion.p>

          {/* Couple names */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory font-normal tracking-wide leading-none mb-1"
          >
            Ricky
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="font-italian text-5xl sm:text-6xl md:text-7xl text-accent-light block my-1 drop-shadow-sm"
          >
            &amp;
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory font-normal tracking-wide leading-none mb-5"
          >
            Fellycia
          </motion.h1>

          {/* Ornament divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex justify-center"
          >
            <Ornament type="divider" color="#FEFEFE" className="mb-6 opacity-75" />
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="font-body text-body-lg sm:text-heading-sm text-ivory/90 mb-10 tracking-[0.2em] uppercase font-light"
          >
            {t.cover.date}
          </motion.p>

          {/* Open invitation button - Elegant Curved Pill */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpen}
            className="inline-flex items-center justify-center gap-2.5 px-9 sm:px-11 py-3.5 sm:py-4
                       border border-ivory/60 hover:border-ivory
                       bg-white/10 hover:bg-ivory hover:text-primary
                       text-ivory font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold
                       rounded-full backdrop-blur-md shadow-xl transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-ivory/50 focus:ring-offset-2 focus:ring-offset-primary"
            id="btn-open-invitation"
          >
            <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{t.cover.openInvitation}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

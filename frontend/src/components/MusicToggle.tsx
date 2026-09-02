import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 select-none"
      aria-label="Floating Controls"
    >
      {/* Unified Transparent Glassmorphic Capsule */}
      <div className="flex items-center bg-black/35 hover:bg-black/65 backdrop-blur-md border border-white/20 hover:border-white/35 rounded-full px-2.5 py-1.5 md:px-3 md:py-2 text-white shadow-lg transition-all duration-300 gap-1.5 md:gap-2">
        {/* Music Toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-center text-ivory/90 hover:text-white transition-colors p-1 rounded-full focus:outline-none"
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
          title={isPlaying ? 'Mute background music' : 'Play background music'}
          id="btn-music-toggle"
        >
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ['40%', '100%', '60%', '100%', '40%'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-0.5 bg-white rounded-full"
                  style={{ minHeight: '3px' }}
                />
              ))}
            </div>
          ) : (
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          )}
        </button>

        {/* Minimal Divider */}
        <div className="w-px h-3.5 bg-white/20" />

        {/* Language Switcher Toggle */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-[11px] md:text-xs font-sans font-medium text-ivory/80 hover:text-white transition-colors px-1 py-0.5 rounded focus:outline-none"
          title={t.footer.switchLangTooltip}
          aria-label="Toggle language"
        >
          <span className={language === 'en' ? 'text-white font-bold' : 'text-white/50'}>EN</span>
          <span className="text-white/30 text-[9px]">/</span>
          <span className={language === 'id' ? 'text-white font-bold' : 'text-white/50'}>ID</span>
        </button>
      </div>
    </motion.aside>
  );
}
